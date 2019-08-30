import { AuthenticationError } from "apollo-server-core";
import { BackroomContext } from "./types";
import { GalleryIsNotOpenError } from "../errors";
import { and, chain, inputRule, not, or, rule, shield } from "graphql-shield";
import { first } from "lodash";
import Yup from "yup";

// yup

const isValidPlacementCoodinate = (yup: typeof Yup) =>
  yup
    .number()
    .required()
    .moreThan(0)
    .lessThan(1000);

// shields

const isKnownEntity = rule({ cache: "contextual" })(
  async (parent, args, ctx) => {
    if (ctx.currentEntity === null) {
      return new AuthenticationError("Entity not known.");
    }

    return true;
  },
);

const ownsAsset = mapper =>
  rule({ cache: "strict" })(
    async (parent, args, { prisma, currentEntity }: BackroomContext) => {
      const assetOwner = await prisma.asset({ id: mapper(args) }).owner();
      if (!assetOwner || assetOwner.id !== currentEntity.id) {
        return new AuthenticationError("Asset is not owned.");
      }

      return true;
    },
  );

const onlyDuringActiveShow = rule()(
  async (parent, args, { prisma }: BackroomContext) => {
    const exhibitions = await prisma.exhibitions({
      first: 1,
      orderBy: "number_DESC",
    });

    const exhibition = first(exhibitions);
    if (!exhibition) {
      return new GalleryIsNotOpenError();
    }

    return true;
  },
);

export default shield(
  {
    Query: {
      //
    },
    Mutation: {
      loginAs: inputRule(yup =>
        yup.object({
          privateKey: yup
            .string()
            .length(66)
            .matches(/^0x[0-9a-fA-F]{64}/)
            .required(),
        }),
      ),
      placeAsset: chain(
        and(
          onlyDuringActiveShow,
          inputRule(yup =>
            yup.object({
              assetId: yup.string().required(),
              roomId: yup.string().required(),
              x: isValidPlacementCoodinate(yup),
              y: isValidPlacementCoodinate(yup),
            }),
          ),
        ),
        isKnownEntity,
        ownsAsset(({ assetId }) => assetId),
      ),
    },
  },
  {
    debug: process.env.NODE_ENV !== "production",
    fallbackError: "Not Authorized",
  },
);

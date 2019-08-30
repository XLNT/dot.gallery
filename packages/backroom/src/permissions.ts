import { AuthenticationError } from "apollo-server-core";
import { BackroomContext } from "./types";
import { GalleryIsNotOpenError } from "../errors";
import { and, chain, inputRule, not, or, rule, shield } from "graphql-shield";
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
  async (parent, args, { currentEntity }: BackroomContext) => {
    if (!currentEntity || currentEntity === null) {
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
  async (parent, args, { prisma, currentExhibition }: BackroomContext) => {
    if (!currentExhibition) {
      return new GalleryIsNotOpenError();
    }

    const shows = await prisma.exhibition({ id: currentExhibition.id }).shows();
    // TODO: make sure we're in a show

    return true;
  },
);

const onlyMod = rule({ cache: "contextual" })(
  async (parent, args, { currentEntity }: BackroomContext) => {
    if (!currentEntity.email.endsWith("@bydot.app")) {
      return new AuthenticationError("You are not a mod.");
    }

    return true;
  },
);

export default shield(
  {
    Query: {
      currentEntity: isKnownEntity,
    },
    Mutation: {
      // loginAs: ,
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
      modIssueTicket: chain(isKnownEntity, onlyMod),
    },
  },
  {
    debug: process.env.NODE_ENV !== "production",
    fallbackError: "Not Authorized",
  },
);

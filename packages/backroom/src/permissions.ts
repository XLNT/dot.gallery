import * as Yup from "yup";
import { AuthenticationError } from "apollo-server-core";
import { BackroomContext } from "./types";
import {
  CouponAlreadyRedeemedError,
  CouponAtCapacityError,
  CouponNotFoundError,
  GalleryIsNotOpenError,
} from "./errors";
import { and, chain, inputRule, not, or, rule, shield } from "graphql-shield";
import prisma from "./api/prisma";

type ArgsMapper = (any) => string;

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

const ownsAsset = (mapper: ArgsMapper) =>
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

// const ticketNotRedeemed = (mapper: ArgsMapper) =>
//   rule()(async (parent, args, { prisma }: BackroomContext) => {
//     const redeemed = await prisma.ticket({ id: mapper(args) }).redeemed();

//     return !redeemed;
//   });

const couponExists = (mapper: ArgsMapper) =>
  rule()(async (parent, args, { prisma }: BackroomContext) => {
    const exists = await prisma.$exists.coupon({ code: mapper(args) });

    if (!exists) {
      return new CouponNotFoundError();
    }

    return true;
  });

const couponHasCapacity = (mapper: ArgsMapper) =>
  rule()(async (parent, args, { prisma }: BackroomContext) => {
    const coupon = await prisma.coupon({ code: mapper(args) });

    const issued = await prisma
      .couponRedemptionsConnection({ where: { coupon: { id: coupon.id } } })
      .aggregate()
      .count();

    const canRedeem = coupon.capacity > issued;
    if (!canRedeem) {
      return new CouponAtCapacityError();
    }

    return true;
  });

const couponNotRedeemed = (mapper: ArgsMapper) =>
  rule()(async (parent, args, { prisma, currentEntity }: BackroomContext) => {
    const hasRedeemed = await prisma.$exists.couponRedemption({
      coupon: { code: mapper(args) },
      entity: { id: currentEntity.id },
    });

    if (hasRedeemed) {
      return new CouponAlreadyRedeemedError();
    }

    return true;
  });

const ownsAvailableTicketForCurrentExhibition = rule()(
  async (parent, args, { currentEntity, currentExhibition }) => {
    const availableTicketsCount = await prisma
      .ticketsConnection({
        where: {
          owner: { id: currentEntity.id },
          exhibition: { id: currentExhibition.id },
          redeemed: false,
        },
      })
      .aggregate()
      .count();

    if (availableTicketsCount < 1) {
      return new Error("You do not own a ticket for this exhibition.");
    }

    return true;
  },
);

export default shield(
  {
    Query: {
      currentEntity: isKnownEntity,
      userDataToken: isKnownEntity,
    },
    Mutation: {
      redeemTicket: chain(
        isKnownEntity,
        onlyDuringActiveShow,
        // ticketNotRedeemed(({ ticketId }) => ticketId),
        ownsAvailableTicketForCurrentExhibition,
      ),
      createPlacement: chain(
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
      redeemCoupon: chain(
        isKnownEntity,
        couponExists(({ code }) => code),
        couponHasCapacity(({ code }) => code),
        couponNotRedeemed(({ code }) => code),
      ),
      awardWalk: chain(isKnownEntity, onlyDuringActiveShow),
      modIssueTicket: chain(isKnownEntity, onlyMod),
    },
  },
  {
    debug: process.env.NODE_ENV !== "production",
    fallbackError: "Not Authorized",
  },
);

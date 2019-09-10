import { MutationResolvers } from "../resolvers-types";
import issueTicket from "../lib/issueTicket";

const redeemCoupon: MutationResolvers["redeemCoupon"] = async (
  root,
  { code },
  { prisma, currentEntity, currentExhibition },
) => {
  const redemption = await prisma.createCouponRedemption({
    coupon: { connect: { code } },
    entity: { connect: { id: currentEntity.id } },
  });

  // issue ticket to current user
  await issueTicket(prisma, currentExhibition.id, { id: currentEntity.id });

  return redemption;
};

export default {
  Mutation: {
    redeemCoupon,
  },
};

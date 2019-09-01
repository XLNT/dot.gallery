import { AssetDomain } from "../types";
import { MutationResolvers } from "../resolvers-types";

const awardWalk: MutationResolvers["awardWalk"] = async (
  root,
  { image },
  { prisma, currentEntity },
) =>
  prisma.createAsset({
    domain: AssetDomain.Walk,
    owner: { connect: { id: currentEntity.id } },
    uri: { image },
  });

export default {
  Mutation: {
    awardWalk,
  },
};

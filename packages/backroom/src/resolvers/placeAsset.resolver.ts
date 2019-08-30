import { MutationResolvers } from "../resolvers-types";
import relation from "../lib/relation";

const placeAsset: MutationResolvers["placeAsset"] = async (
  root,
  { assetId, roomId, x, y },
  { prisma, currentEntity },
) => {
  // TODO: do this in a single transaction

  // register placement & grant counterfactual token
  const placement = await prisma.createPlacement({
    x,
    y,
    entity: { connect: { id: currentEntity.id } },
    room: { connect: { id: roomId } },
    counterfactualToken: {
      create: { owner: { connect: { id: currentEntity.id } }, tokenURI: "" },
    },
  });

  // delete the asset
  await prisma.deleteAsset({ id: assetId });

  return placement;
};

export default {
  Mutation: {
    placeAsset,
  },
  Placement: {
    entity: relation("placement", "entity"),
    room: relation("placement", "room"),
    counterfactualToken: relation("placement", "counterfactualToken"),
  },
};

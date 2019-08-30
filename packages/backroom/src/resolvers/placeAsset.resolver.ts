import { MutationResolvers, PlacementResolvers } from "../resolvers-types";

const placeAsset: MutationResolvers["placeAsset"] = async (
  parent,
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

const placementEntity: PlacementResolvers["entity"] = async (
  { id },
  args,
  { prisma },
) => prisma.placement({ id }).entity();
const placementCounterfactualToken: PlacementResolvers["counterfactualToken"] = async (
  { id },
  args,
  { prisma },
) => prisma.placement({ id }).counterfactualToken();
const placementRoom: PlacementResolvers["room"] = async (
  { id },
  args,
  { prisma },
) => prisma.placement({ id }).room();

export default {
  Mutation: {
    placeAsset,
  },
  Placement: {
    entity: placementEntity,
    room: placementRoom,
    counterfactualToken: placementCounterfactualToken,
  },
};

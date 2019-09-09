import { AssetDomain } from "../types";
import { MutationResolvers } from "../resolvers-types";
import relation from "../lib/relation";

const createPlacement: MutationResolvers["createPlacement"] = async (
  root,
  { assetId, roomId, x, y },
  { prisma, currentEntity },
) => {
  // TODO: do this in a single transaction
  // TODO: require that the asset be in the correct domain?

  // register placement & grant counterfactual token
  const placement = await prisma.createPlacement({
    x,
    y,
    entity: { connect: { id: currentEntity.id } },
    room: { connect: { id: roomId } },
    assets: {
      create: [
        {
          domain: AssetDomain.Memorabilia,
          owner: { connect: { id: currentEntity.id } },
          uri: { image: "https://placekitten.com/256/256" },
        },
      ],
    },
  });

  // delete the asset
  await prisma.deleteAsset({ id: assetId });

  return placement;
};

export default {
  Mutation: {
    createPlacement,
  },
  Placement: {
    entity: relation("placement", "entity"),
    room: relation("placement", "room"),
    assets: relation("placement", "assets"),
  },
};

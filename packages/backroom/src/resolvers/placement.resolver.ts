import { AssetDomain, BackroomContext } from "../types";
import { MutationResolvers } from "../resolvers-types";
import { get } from "lodash";
import relation from "../lib/relation";

const getAssetUrl = async (
  entryId: string,
  contentful: BackroomContext["contentful"],
) => {
  const _c = await contentful();

  // fetch the memorabilia for this room
  const entry = await _c.environment.getEntry(entryId);

  const contentfulAssetId = get(entry, "fields.memorabilia.en-US.sys.id");

  const asset = await _c.environment.getAsset(contentfulAssetId);

  return get(asset, "fields.file.en-US.url");
};

const createPlacement: MutationResolvers["createPlacement"] = async (
  root,
  { assetId, roomId, x, y },
  { prisma, contentful, currentEntity },
) => {
  // TODO: do this in a single transaction
  // TODO: require that the asset be in the correct domain?
  const room = await prisma.room({ id: roomId });
  const image = await getAssetUrl(room.entryId, contentful);

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
          uri: { image },
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

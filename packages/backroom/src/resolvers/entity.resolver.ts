import { AssetDomain } from "../types";
import {
  EntityResolvers,
  MutationResolvers,
  QueryResolvers,
} from "../resolvers-types";
import { makeForEntity } from "../api/auth";
import relation from "../lib/relation";

const currentEntity: QueryResolvers["currentEntity"] = async (
  root,
  args,
  { currentEntity },
) => currentEntity;

const loginAs: MutationResolvers["loginAs"] = async (
  root,
  { accessToken },
  { prisma, auth0 },
) => {
  const userInfo = await auth0.users.getInfo(accessToken);
  if (!userInfo) {
    console.log(`Auth0 returned no userInfo for ${accessToken}`);
    throw new Error("Invalid passwordless auth token.");
  }

  const { email } = userInfo;
  if (!email) {
    console.log(`Auth0 returned no email in ${JSON.stringify(userInfo)}`);
    throw new Error("Invalid passwordless auth token.");
  }

  const existingEntity = await prisma.entity({ email });
  if (existingEntity) {
    return makeForEntity(existingEntity);
  }

  const entity = await prisma.createEntity({ email });

  return makeForEntity(entity);
};

const tradableAssets: EntityResolvers["tradableAssets"] = async (
  { id },
  args,
  { prisma },
) =>
  prisma.entity({ id }).assets({
    where: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      domain_in: [
        AssetDomain.Patronage.toString(),
        AssetDomain.Memorabilia.toString(),
      ],
    },
  });

export default {
  Query: {
    currentEntity,
  },
  Mutation: {
    loginAs,
  },
  Entity: {
    assets: relation("entity", "assets"),
    tradableAssets,
    placements: relation("entity", "placements"),
    tickets: relation("entity", "tickets"),
  },
};

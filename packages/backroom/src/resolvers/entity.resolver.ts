import { MutationResolvers, QueryResolvers } from "../resolvers-types";
import { makeForEntity } from "../api/auth";
import relation from "../lib/relation";

const currentEntity: QueryResolvers["currentEntity"] = async (
  root,
  args,
  { currentEntity },
) => currentEntity;

const entity: QueryResolvers["entity"] = async (root, { id }, { prisma }) =>
  prisma.entity({ id });

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

export default {
  Query: {
    currentEntity,
    entity,
  },
  Mutation: {
    loginAs,
  },
  Entity: {
    assets: relation("entity", "assets"),
    counterfactualTokens: relation("entity", "counterfactualTokens"),
    placements: relation("entity", "placements"),
    tickets: relation("entity", "tickets"),
  },
};

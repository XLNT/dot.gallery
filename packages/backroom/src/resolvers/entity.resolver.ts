import { BackroomContext } from "../types";
import { MutationResolvers, QueryResolvers } from "../resolvers-types";

const entity: QueryResolvers<BackroomContext>["entity"] = async (
  root,
  { id },
  { prisma },
) => prisma.entity({ id });

const loginAs: MutationResolvers<BackroomContext>["loginAs"] = async (
  root,
  { accessToken, privateKey },
  { prisma, auth0 },
) => {
  const userInfo = await auth0.users.getInfo(accessToken);
  if (!userInfo) {
    throw new Error("fuck you");
  }

  const { email } = userInfo;
  if (!email) {
    throw new Error("the fuck?");
  }

  const existingEntity = await prisma.entity({ email });
  if (existingEntity) {
    return existingEntity;
  }

  const publicKey = "";

  return await prisma.createEntity({
    email,
    privateKey,
    publicKey,
  });
};

export default {
  Query: {
    entity,
  },
  Mutation: {
    loginAs,
  },
};

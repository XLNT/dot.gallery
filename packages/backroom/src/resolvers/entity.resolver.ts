import { BackroomContext } from "../types";
import { QueryResolvers } from "../resolvers-types";

const entity: QueryResolvers<BackroomContext>["entity"] = async (
  root,
  { id },
  { prisma },
) => prisma.entity({ id });

export default {
  Query: {
    entity,
  },
};

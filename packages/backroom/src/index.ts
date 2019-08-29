import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import { applyMiddleware } from "graphql-middleware";
import { config } from "dotenv";
import { importSchema } from "graphql-import";
import { resolve } from "path";

import { Prisma } from "./prisma";
import permissions from "./permissions";
import resolvers from "./resolvers";

config({ path: resolve(__dirname, "../../../.env") });

const typeDefs = importSchema(resolve(__dirname, "backroom.graphql"));

const prisma = new Prisma({
  endpoint: process.env.PRISMA_BACKROOM_SERVICE_ENDPOINT,
  secret: process.env.PRISMA_BACKROOM_SERVICE_SECRET,
  debug: true,
});

const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }),
  permissions,
);

const server = new ApolloServer({
  schema,
  debug: true,
  playground: false,
  context: async req => ({
    ...req,
    prisma,
  }),
});

export default server.createHandler();

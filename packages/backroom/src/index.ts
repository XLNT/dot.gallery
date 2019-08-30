import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../../../packages/prisma/.env") });
config({ path: resolve(__dirname, ".env") });

import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import { applyMiddleware } from "graphql-middleware";
import { importSchema } from "graphql-import";

import { Prisma } from "./prisma";
import auth0 from "./auth0/client";
import permissions from "./permissions";
import resolvers from "./resolvers";

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
  playground: false,
  context: async req => ({
    ...req,
    prisma,
    auth0,
  }),
});

export default server.createHandler();

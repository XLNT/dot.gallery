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
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
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
    currentEntity: await prisma.entity({ id: "cjzxvsxji007w0723ffo0gp5i" }),
  }),
});

export default server.createHandler();

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../../../.env") });

import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import { applyMiddleware } from "graphql-middleware";
import { importSchema } from "graphql-import";

import auth0 from "./api/auth0";
import permissions from "./permissions";
import prisma from "./api/prisma";
import resolvers from "./resolvers";

const typeDefs = importSchema(resolve(__dirname, "backroom.graphql"));

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

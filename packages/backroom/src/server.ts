import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../../../.env") });

import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import { applyMiddleware } from "graphql-middleware";
import { importSchema } from "graphql-import";

import { IncomingMessage, ServerResponse } from "http";
import { verify } from "./api/auth";
import auth0 from "./api/auth0";
import getCurrentExhibition from "./lib/getCurrentExhibition";
import permissions from "./permissions";
import prisma from "./api/prisma";
import resolvers from "./resolvers";

const typeDefs = importSchema(resolve(__dirname, "backroom.graphql"));

const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }),
  permissions,
);

const entityFromRequest = async (req: IncomingMessage) => {
  const header = req.headers["authorization"];
  if (!header) {
    console.log(`No Authorization header present.`);
    return null;
  }

  const parts = header.split("Bearer ");
  if (!parts.length) {
    console.log(`No Bearer token in '${header}'`);
    return null;
  }

  const token = parts[1];
  if (!token) {
    console.log(`No token available in '${header}'`);
    return null;
  }

  const body = await verify(token);

  const entity = prisma.entity({ id: body.id });
  if (!entity) {
    console.log(`Entity with id ${body.id} not found`);
    return null;
  }

  return entity;
};

const server = new ApolloServer({
  schema,
  debug: false,
  playground: false,
  context: async (ctx: { req: IncomingMessage; res: ServerResponse }) => ({
    ...ctx,
    prisma,
    auth0,
    currentEntity: await entityFromRequest(ctx.req),
    currentExhibition: await getCurrentExhibition(prisma),
  }),
});

export default server.createHandler();

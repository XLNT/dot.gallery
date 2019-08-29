import { resolve } from "path"
import { config } from "dotenv"
import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import {applyMiddleware} from 'graphql-middleware'
import { rule, shield, and, or, not, inputRule } from 'graphql-shield'

import { Prisma } from "./prisma";
import resolvers from "./resolvers";

config({path: resolve(__dirname, '../../../.env')});

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const isEntity = rule({cache: 'contextual'})(async (parent, args, ctx, info) => {
  return !!ctx.entity;
})

const isFormatted = inputRule(yup => yup.object({name: yup.string().required()}))

const permissions = shield({
  Query: {
    hello: and(isEntity, isFormatted),
  },
})

const prisma = new Prisma({
  endpoint: process.env.PRISMA_BACKROOM_SERVICE_ENDPOINT,
  secret: process.env.PRISMA_BACKROOM_SERVICE_SECRET,
  debug: true,
});

const schema = applyMiddleware(makeExecutableSchema({typeDefs, resolvers}), permissions);

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

import { resolve } from "path"
import { config } from "dotenv"
import { ApolloServer } from "apollo-server-micro";

import { Prisma } from "./prisma";
import resolvers from "./resolvers";

config({path: resolve(__dirname, '../../../.env')});

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

console.log(process.env)

const prisma = new Prisma({
  endpoint: process.env.PRISMA_BACKROOM_SERVICE_ENDPOINT,
  secret: process.env.PRISMA_BACKROOM_SERVICE_SECRET,
  debug: true,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: true,
  playground: false,
  context: req => ({
    ...req,
    prisma,
  }),
});

export default server.createHandler();

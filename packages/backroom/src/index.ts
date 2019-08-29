import { ApolloServer } from "apollo-server-micro";

import { Prisma } from "./prisma";
import resolvers from "./resolvers";

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const prisma = new Prisma({
  endpoint: process.env.PRISMA_BACKROOM_SERVICE_ENDPOINT,
  secret: process.env.PRISMA_BACKROOM_SERVICE_SECRET,
  debug: true,
});

console.log(process.env);
console.log(resolvers);

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

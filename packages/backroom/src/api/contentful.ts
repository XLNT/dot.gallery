import { createClient } from "contentful-management";

export type ContentfulClient = ReturnType<createClient>;

let space;
let environment;

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

export default async () => {
  if (!space) {
    space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
  }

  if (!environment) {
    environment = await space.getEnvironment("master");
  }

  return {
    client,
    space,
    environment,
  };
};

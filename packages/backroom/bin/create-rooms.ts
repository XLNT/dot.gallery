#!/usr/bin/env npx ts-node

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../../../.env") });

import { createClient } from "contentful-management";

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const main = async () => {
  const envString = process.argv[2];
  const exhibitionNumber = parseInt(process.argv[3], 10);
  const extent = parseInt(process.argv[4], 10);
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment(envString);

  for (let x = 0; x < extent; x++) {
    for (let y = 0; y < extent; y++) {
      // create a room for each
      const title = `E${exhibitionNumber} (${x}, ${y})`;
      const entry = await environment.createEntry("room", {
        fields: {
          title: {
            "en-US": title,
          },
        },
      });
      await entry.publish();
      console.log(
        `{
  entryId: "${entry.sys.id}"
  x: ${x}
  y: ${y}
}`,
      );
    }
  }
};

main().catch(console.error.bind(console));

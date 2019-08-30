import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../../.env") });

import { NowRequest, NowResponse } from "@now/node";
import { get, times } from "lodash";
import Stripe from "stripe";
import prisma from "./api/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET);

const getRawBody = (req: NowRequest) =>
  new Promise(resolve => {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on("end", () => {
      resolve(body);
    });
  });

export default async (req: NowRequest, res: NowResponse) => {
  const sig = req.headers["stripe-signature"];
  const body = await getRawBody(req);

  const bail = (message: string) => res.status(400).send(message);

  let event: Stripe.events.IEvent;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_SIGNING_SECRET,
    );
  } catch (err) {
    return bail(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session: Record<string, any> = event.data.object;
    const email = get(session, ["customer", "email"]);

    if (!email) {
      // no customer!
      return bail(`No customer information provided.`);
    }

    const exhibitionId = get(session, ["display_items", 0, "custom", "id"]);

    if (!exhibitionId) {
      return bail(`No exhibition id provided.`);
    }

    // issue patronage assets
    await prisma.updateEntity({
      where: { email },
      data: {
        tickets: {
          create: { exhibition: { connect: { id: exhibitionId } } },
        },
        assets: {
          create: times(3, () => ({
            uri: "https://dot.gallery/token.png",
          })),
        },
      },
    });
  }

  res.json({ received: true });
};

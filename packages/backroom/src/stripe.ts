import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../../../.env") });

import { NowRequest, NowResponse } from "@now/node";
import { get } from "lodash";
import Stripe from "stripe";
import getCurrentExhibition from "./lib/getCurrentExhibition";
import issueTicket from "./lib/issueTicket";
import prisma from "./api/prisma";

const kStubStripeWebhook = process.env.STUB_STRIPE_WEBHOOK === "true";

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
    let email: string = get(session, ["customer", "email"]);

    if (!email) {
      // no customer!
      if (!kStubStripeWebhook) {
        return bail(`No customer information provided.`);
      }

      email = "matt@bydot.app";
    }

    let exhibitionId: string = get(session, [
      "display_items",
      0,
      "custom",
      "id",
    ]);

    if (!exhibitionId) {
      if (!kStubStripeWebhook) {
        return bail(`No exhibition id provided.`);
      }
      exhibitionId = (await getCurrentExhibition(prisma)).id;
    }

    await issueTicket(prisma, exhibitionId, { email });
  }

  res.json({ received: true });
};

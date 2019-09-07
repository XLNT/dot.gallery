import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../../../.env") });

import { NowRequest, NowResponse } from "@now/node";
import { get } from "lodash";
import Stripe from "stripe";
import auth0 from "./api/auth0";
import getCurrentExhibition from "./lib/getCurrentExhibition";
import issueTicket from "./lib/issueTicket";
import prisma from "./api/prisma";
import stripe from "./api/stripe";

const kStubStripeWebhook = process.env.STUB_STRIPE_WEBHOOK === "true";

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
    const customerId: string = get(session, ["customer"]);

    let email: string;
    if (!customerId) {
      if (!kStubStripeWebhook) {
        // get customer Id and set email
        const customer = await stripe.customers.retrieve(customerId);
        email = customer.email;
      }
    }

    if (!email) {
      // no customer!
      if (!kStubStripeWebhook) {
        return bail(`No customer information provided.`);
      }

      email = "matt@bydot.app";
    }

    const exhibitionId = (await getCurrentExhibition(prisma)).id;

    await issueTicket(prisma, exhibitionId, { email });

    // send login email
    await auth0.passwordless.sendEmail({
      email,
      send: "link",
      authParams: {
        responseType: "token",
        scope: "openid email",
      },
    });

    res.json({ received: true, email, exhibitionId });
    return;
  }

  res.json({ received: true });
  return;
};

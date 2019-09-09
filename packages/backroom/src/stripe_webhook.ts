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
  const bail = (message: string) => {
    console.log(`Bailing: ${message}`);
    res.status(400).send(message);
  };

  try {
    const sig = req.headers["stripe-signature"];
    const body = await getRawBody(req);

    let event: Stripe.events.IEvent;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_SIGNING_SECRET,
      );
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session: Record<string, any> = event.data.object;
      const customerId: string = get(session, ["customer"]);

      if (!customerId) {
        throw new Error(`No customerId present in ${JSON.stringify(session)}`);
      }

      console.log(session);
      const { email } = await stripe.customers.retrieve(customerId);

      if (!email) {
        // no customer!
        throw new Error(
          `Could not derive customer email from id '${customerId}'`,
        );
      }

      const exhibitionId = (await getCurrentExhibition(prisma)).id;

      console.log(`Issuing ticket for exhibition '${exhibitionId}'`);
      await issueTicket(prisma, exhibitionId, { email });

      // send login email
      console.log(`Sending login email to ${email}.`);
      await auth0.passwordless.sendEmail({
        email,
        send: "link",
        authParams: {
          responseType: "token",
          scope: "openid email",
        },
      });

      return res.json({ received: true, email, exhibitionId });
    }

    return res.json({ received: true });
  } catch (error) {
    console.error(error);
    return bail(error.message);
  }
};

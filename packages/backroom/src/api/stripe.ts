import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export default stripe;

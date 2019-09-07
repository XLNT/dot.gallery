import config from "config";

export default () => window.Stripe(config.STRIPE_PUBLISHABLE);

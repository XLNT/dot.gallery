// env-related config information

const config = {
  BACKROOM_URI: process.env.BACKROOM_URI,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  STRIPE_PUBLISHABLE: process.env.STRIPE_PUBLISHABLE,
  BASE_URI: process.env.BASE_URI,
};

console.log(config);

export default config;
import { AuthenticationClient } from "auth0";

export default new AuthenticationClient({
  domain: "bydot.auth0.com",
  clientId: process.env.AUTH0_CLIENT_ID,
});

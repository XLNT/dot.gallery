import { AuthenticationClient } from "auth0";

import config from "config";

export default new AuthenticationClient({
  domain: "bydot.auth0.com",
  clientId: config.AUTH0_CLIENT_ID,
});

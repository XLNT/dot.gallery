import auth0 = require("auth0-js");
import config from "config";

export const requestLogin = async (email: string, goto: string) => {
  const webAuth = new auth0.WebAuth({
    domain: "bydot.auth0.com",
    clientID: config.AUTH0_CLIENT_ID,
    redirectUri: `${config.BASE_URI}/login?${new URLSearchParams({
      goto,
    })}`,
  });

  return new Promise((resolve, reject) =>
    webAuth.passwordlessStart(
      {
        connection: "email",
        email,
        send: "link",
        authParams: {
          responseType: "token",
          scope: "openid email",
        },
      },
      (err, res) => (err ? reject(err) : resolve(res)),
    ),
  );
};

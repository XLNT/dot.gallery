import * as Twilio from "twilio";
import { QueryResolvers } from "../resolvers-types";

const twilioAccessToken: QueryResolvers["twilioAccessToken"] = async (
  root,
  args,
  { currentEntity },
) => {
  // Create an Access Token
  const accessToken = new Twilio.jwt.AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    {
      identity: currentEntity.id,
      ttl: 14400, // 4h
    },
  );

  // Grant access to Video
  const grant = new Twilio.jwt.AccessToken.VideoGrant();
  accessToken.addGrant(grant);

  // Serialize the token as a JWT
  return accessToken.toJwt();
};

export default {
  Query: {
    twilioAccessToken,
  },
};

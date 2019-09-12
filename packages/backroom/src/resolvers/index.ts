import { mergeResolvers } from "merge-graphql-schemas";

import asset from "./asset.resolver";
import coupon from "./coupon.resolver";
import entity from "./entity.resolver";
import exhibition from "./exhibition.resolver";
import mod from "./mod.resolvers";
import placement from "./placement.resolver";
import ticket from "./ticket.resolver";
import twilio from "./twilio.resolver";

export default mergeResolvers([
  entity,
  placement,
  exhibition,
  mod,
  coupon,
  twilio,
  ticket,
  asset,
]);

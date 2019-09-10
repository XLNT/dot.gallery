import { mergeResolvers } from "merge-graphql-schemas";

import asset from "./asset.resolver";
import coupon from "./coupon.resolver";
import entity from "./entity.resolver";
import exhibition from "./exhibition.resolver";
import mod from "./mod.resolvers";
import placement from "./placement.resolver";
import simplewebrtc from "./simplewebrtc.resolver";
import ticket from "./ticket.resolver";

export default mergeResolvers([
  entity,
  placement,
  exhibition,
  mod,
  coupon,
  simplewebrtc,
  ticket,
  asset,
]);

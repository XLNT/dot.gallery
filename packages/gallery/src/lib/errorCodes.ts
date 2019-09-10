import { ApolloError } from "apollo-client";
import { get } from "lodash";

export const ERROR_CODES = {
  COUPON_NOT_FOUND: "Unknown voucher code.",
  COUPON_AT_CAPACITY: "This voucher has already been redeemed.",
};

export const humanize = (error: ApolloError) => {
  const code = get(error, ["graphQLErrors", 0, "extensions", "code"]);
  return code ? ERROR_CODES[code] : "An internal error ocurred—try again?";
};

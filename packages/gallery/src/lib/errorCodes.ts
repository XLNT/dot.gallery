import { ApolloError } from "apollo-client";
import { get } from "lodash";

export const ERROR_CODES = {
  COUPON_NOT_FOUND: "Unknown voucher code.",
  COUPON_AT_CAPACITY: "This voucher has already been redeemed to its capacity.",
  COUPON_ALREADY_REDEEMED: "You have already redeemed this voucher.",
  INTERNAL_SERVER_ERROR: "An internal error ocurred—try again?",
};

export const humanize = (error: ApolloError) => {
  const code = get(
    error,
    ["graphQLErrors", 0, "extensions", "code"],
    "INTERNAL_SERVER_ERROR",
  );

  const name = get(error, [
    "graphQLErrors",
    0,
    "extensions",
    "exception",
    "name",
  ]);

  if (name && name === "ValidationError") {
    return get(error, [
      "graphQLErrors",
      0,
      "extensions",
      "exception",
      "message",
    ]);
  }

  return ERROR_CODES[code];
};

import { ApolloError } from "apollo-server-core";

export class GalleryIsNotOpenError extends ApolloError {
  constructor(props?: Record<string, any>) {
    super("dot.gallery is closed", "GALLERY_IS_NOT_OPEN", props);
  }
}

export class CouponNotFoundError extends ApolloError {
  constructor(props?: Record<string, any>) {
    super("Coupon not found.", "COUPON_NOT_FOUND", props);
  }
}

export class CouponAtCapacityError extends ApolloError {
  constructor(props?: Record<string, any>) {
    super("Coupon at capacity.", "COUPON_AT_CAPACITY", props);
  }
}

export class CouponAlreadyRedeemedError extends ApolloError {
  constructor(props?: Record<string, any>) {
    super("Coupon already redeemed.", "COUPON_ALREADY_REDEEMED", props);
  }
}

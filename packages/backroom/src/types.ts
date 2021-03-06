import { AuthenticationClient } from "auth0";
import { Entity, Exhibition, Prisma } from "./prisma";
import ContentfulPromise from "./api/contentful";
import Stripe from "stripe";

export interface BackroomContext {
  prisma: Prisma;
  auth0: AuthenticationClient;
  stripe: Stripe;
  contentful: typeof ContentfulPromise;
  currentEntity: Entity | null;
  currentExhibition: Exhibition | null;
}

export enum AssetDomain {
  Patronage = "patronage",
  Memorabilia = "memorabilia",
  Walk = "walk",
}

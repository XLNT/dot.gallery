import { AuthenticationClient } from "auth0";
import { Entity, Exhibition, Prisma } from "./prisma";

export interface BackroomContext {
  prisma: Prisma;
  auth0: AuthenticationClient;
  currentEntity: Entity | null;
  currentExhibition: Exhibition | null;
}

export enum AssetDomain {
  Patronage = "patronage",
  Memorabilia = "memorabilia",
  Walk = "walk",
}

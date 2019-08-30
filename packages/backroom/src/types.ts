import { AuthenticationClient } from "auth0";
import { Entity, Prisma } from "./prisma";

export interface BackroomContext {
  prisma: Prisma;
  auth0: AuthenticationClient;
  currentEntity?: Entity | null;
}

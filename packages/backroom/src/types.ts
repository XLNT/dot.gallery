import { AuthenticationClient } from "auth0";
import { Prisma } from "./prisma";

export interface BackroomContext {
  prisma: Prisma;
  auth0: AuthenticationClient;
}

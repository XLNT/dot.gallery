import { Exhibition, Prisma } from "../prisma";
import { first } from "lodash";

export default async (prisma: Prisma): Promise<Exhibition | null> => {
  const exhibitions = await prisma.exhibitions({
    first: 1,
    orderBy: "number_DESC",
  });

  return first(exhibitions) || null;
};

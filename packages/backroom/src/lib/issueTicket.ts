import { first, times } from "lodash";

import { AssetDomain } from "../types";
import { EntityWhereUniqueInput, Prisma, Ticket } from "../prisma";

export default async (
  prisma: Prisma,
  exhibitionId: string,
  where: EntityWhereUniqueInput,
): Promise<Ticket> => {
  const entity = prisma.updateEntity({
    where,
    data: {
      // issue ticket
      tickets: {
        create: { exhibition: { connect: { id: exhibitionId } } },
      },
      // issue patronage assets
      assets: {
        create: times(3, () => ({
          domain: AssetDomain.Patronage,
          uri: { image: "https://dot.gallery/token.png" },
        })),
      },
    },
  });

  const tickets = await entity.tickets({ last: 1, orderBy: "createdAt_DESC" });
  return first(tickets);
};

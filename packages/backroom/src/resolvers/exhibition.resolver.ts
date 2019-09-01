import { BackroomContext } from "../types";
import { Exhibition } from "../prisma";
import { ExhibitionResolvers, QueryResolvers } from "../resolvers-types";

import pricing from "../lib/pricing";
import relation from "../lib/relation";

const currentExhibition: QueryResolvers["currentExhibition"] = async (
  root,
  args,
  { currentExhibition },
) => currentExhibition;

const ticketsAvailable: ExhibitionResolvers<
  BackroomContext,
  Exhibition
>["ticketsAvailable"] = async ({ id, capacity }, args, { prisma }) => {
  const issuedTicketsCount = await prisma
    .ticketsConnection({
      where: { exhibition: { id } },
    })
    .aggregate()
    .count();

  console.log(capacity, issuedTicketsCount);

  return capacity - issuedTicketsCount;
};

const currentTicketPrice: ExhibitionResolvers<
  BackroomContext,
  Exhibition
>["currentTicketPrice"] = async (exhibition, args, ctx, info) => {
  const capacity = exhibition.capacity;
  const available = await ticketsAvailable(exhibition, args, ctx, info);

  return pricing(capacity, available);
};

export default {
  Query: {
    currentExhibition,
  },
  Exhibition: {
    ticketsAvailable,
    currentTicketPrice,
    shows: relation("exhibition", "shows"),
    rooms: relation("exhibition", "rooms"),
  },
};

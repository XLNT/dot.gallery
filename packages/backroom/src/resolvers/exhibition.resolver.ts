import { BackroomContext } from "../types";
import { Exhibition } from "../prisma";
import { ExhibitionResolvers, QueryResolvers } from "../resolvers-types";

import { getPrice } from "../lib/pricing";
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

  return capacity - issuedTicketsCount;
};

const currentTicketPrice: ExhibitionResolvers<
  BackroomContext,
  Exhibition
>["currentTicketPrice"] = async ({ id }, args, { prisma }) =>
  getPrice(prisma, id);

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

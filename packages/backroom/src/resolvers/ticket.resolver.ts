import { first } from "lodash";

import { BackroomContext } from "../types";
import { Entity } from "../prisma";
import { EntityResolvers, MutationResolvers } from "../resolvers-types";
import prisma from "../api/prisma";
import relation from "../lib/relation";

const availableTicket: EntityResolvers<
  BackroomContext,
  Entity
>["availableTicket"] = async (entity, args, { prisma, currentExhibition }) => {
  const tickets = await prisma.entity({ id: entity.id }).tickets({
    where: { exhibition: { id: currentExhibition.id }, redeemed: false },
    first: 1,
  });

  return first(tickets) || null;
};

const redeemTicket: MutationResolvers["redeemTicket"] = async (
  root,
  args,
  ctx,
  info,
) => {
  const { currentEntity } = ctx;
  const ticket = await availableTicket(currentEntity, {}, ctx, info);
  return prisma.updateTicket({
    where: {
      id: ticket.id,
    },
    data: { redeemed: true },
  });
};

export default {
  Entity: {
    availableTicket,
  },
  Mutation: {
    redeemTicket,
  },
  Ticket: {
    exhibition: relation("ticket", "exhibition"),
  },
};

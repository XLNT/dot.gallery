import { first } from "lodash";

import { BackroomContext } from "../types";
import { Entity } from "../prisma";
import { EntityResolvers, MutationResolvers } from "../resolvers-types";
import { formatSlug } from "../lib/exhibitionSlug";
import { getPrice } from "../lib/pricing";
import prisma from "../api/prisma";
import relation from "../lib/relation";

const availableTicket: EntityResolvers<
  BackroomContext,
  Entity
>["availableTicket"] = async (entity, args, { prisma, currentExhibition }) => {
  const tickets = await prisma.entity({ id: entity.id }).tickets({
    where: {
      exhibition: { id: currentExhibition.id },
      redeemed: process.env.NODE_ENV === "development" ? undefined : false,
      // ^ restrict to ticker holders only in production
    },
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

const createSession: MutationResolvers["createSession"] = async (
  root,
  args,
  { currentEntity, currentExhibition, prisma, stripe },
) => {
  const currentPrice = await getPrice(prisma, currentExhibition.id);

  const session = await stripe.checkout.sessions.create({
    // eslint-disable-next-line @typescript-eslint/camelcase
    payment_method_types: ["card"],
    // eslint-disable-next-line @typescript-eslint/camelcase
    line_items: [
      {
        name: `dot.gallery ${formatSlug(currentExhibition.number)} Ticket`,
        description: `${formatSlug(currentExhibition.number)}: Admit One`,
        amount: currentPrice,
        currency: "eur",
        quantity: 1,
      },
    ],
    // eslint-disable-next-line @typescript-eslint/camelcase
    customer_email: currentEntity ? currentEntity.email : undefined,
    // TODO: env-dependent
    // eslint-disable-next-line @typescript-eslint/camelcase
    success_url: `${process.env.BASE_URI}/ticket-success`,
    // eslint-disable-next-line @typescript-eslint/camelcase
    cancel_url: `${process.env.BASE_URI}/want-ticket`,
  });

  return session.id;
};

export default {
  Entity: {
    availableTicket,
  },
  Mutation: {
    redeemTicket,
    createSession,
  },
  Ticket: {
    exhibition: relation("ticket", "exhibition"),
  },
};

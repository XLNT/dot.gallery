import { MutationResolvers } from "../resolvers-types";
import issueTicket from "../lib/issueTicket";

const modIssueTicket: MutationResolvers["modIssueTicket"] = async (
  root,
  { exhibitionId, email, id },
  { prisma },
) => issueTicket(prisma, exhibitionId, { id, email });

export default {
  Mutation: {
    modIssueTicket,
  },
};

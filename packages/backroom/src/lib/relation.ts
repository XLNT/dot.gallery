export default (type: string, relation: string) => async (
  { id },
  args,
  { prisma },
) => prisma[type]({ id })[relation]();

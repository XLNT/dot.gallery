export default (relation: string) => async ({ id }, args, { prisma }) =>
  prisma.entity({ id })[relation]();

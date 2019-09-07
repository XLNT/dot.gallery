import { Prisma } from "../prisma";

const remap = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

const priceMin = 400; // $4
const priceMax = 1600; // $16

export const computePrice = (capacity: number, available: number) =>
  Math.floor(remap(available, capacity, 0, priceMin, priceMax));

export const getPrice = async (prisma: Prisma, id: string) => {
  const capacity = await prisma.exhibition({ id }).capacity();
  const issuedTicketsCount = await prisma
    .ticketsConnection({
      where: { exhibition: { id } },
    })
    .aggregate()
    .count();

  const available = capacity - issuedTicketsCount;

  return computePrice(capacity, available);
};

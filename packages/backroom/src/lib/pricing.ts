const remap = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

const priceMin = 400; // $4
const priceMax = 1600; // $16

export default (capacity: number, available: number) =>
  Math.floor(remap(available, capacity, 0, priceMin, priceMax));

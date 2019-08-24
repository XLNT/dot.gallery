export enum Direction {
  Left,
  Up,
  Right,
  Down,
}

const toNumber = (direction: Direction, a: Direction, b: Direction): number =>
  direction === a ? -1 : direction === b ? 1 : 0;

export const navigate = (coord: [number, number], extent: number, direction: Direction) => {
  const [x, y] = coord;

  const newX = extent + x + toNumber(direction, Direction.Left, Direction.Right);
  const newY = extent + y + toNumber(direction, Direction.Up, Direction.Down);
  return [newX % extent, newY % extent];
};

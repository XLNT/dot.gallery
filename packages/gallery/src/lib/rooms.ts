import { find } from "lodash-es";

export type Coords = [number, number];

export enum Direction {
  Left,
  Up,
  Right,
  Down,
}

const kDirectionsToKeycodes: { [_: number]: number } = {
  [Direction.Left]: 37,
  [Direction.Up]: 38,
  [Direction.Right]: 39,
  [Direction.Down]: 40,
};

const kKeycodesToDirections: { [_: number]: number } = {
  37: Direction.Left,
  38: Direction.Up,
  39: Direction.Right,
  40: Direction.Down,
};

export const keycodeFor = (direction: Direction) =>
  kDirectionsToKeycodes[direction];
export const directionFor = (keycode: number) => kKeycodesToDirections[keycode];

const toNumber = (direction: Direction, a: Direction, b: Direction): number =>
  direction === a ? -1 : direction === b ? 1 : 0;

export const navigate = (
  coords: Coords,
  extent: number,
  direction: Direction,
): Coords => {
  const [x, y] = coords;

  const newX =
    extent + x + toNumber(direction, Direction.Left, Direction.Right);
  const newY = extent + y + toNumber(direction, Direction.Up, Direction.Down);
  return [newX % extent, newY % extent];
};

interface WithCoords {
  x: number;
  y: number;
}

export const findRoom = <T extends WithCoords>(
  rooms: Array<T>,
  coords: Coords,
) => find(rooms, room => room.x === coords[0] && room.y === coords[1]) || null;

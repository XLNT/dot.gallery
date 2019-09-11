import { find } from "lodash-es";

import { Direction, directionToNumber } from "./direction";

export type Coords = [number, number];

export const navigate = (
  coords: Coords,
  extent: number,
  direction: Direction,
): Coords => {
  const [x, y] = coords;

  const newX =
    extent + x + directionToNumber(direction, Direction.Left, Direction.Right);
  const newY =
    extent + y + directionToNumber(direction, Direction.Up, Direction.Down);
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

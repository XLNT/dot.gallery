export enum ScrollDirection {
  Inverted = "inverted",
  Natural = "natural",
}

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

export const directionToNumber = (
  direction: Direction,
  a: Direction,
  b: Direction,
): number => (direction === a ? -1 : direction === b ? 1 : 0);

export const invertForPreference = (
  pref: ScrollDirection,
  direction: Direction,
) => {
  if (pref === ScrollDirection.Natural) {
    if (direction === Direction.Up) return Direction.Down;
    if (direction === Direction.Down) return Direction.Up;
    if (direction === Direction.Left) return Direction.Right;
    if (direction === Direction.Right) return Direction.Left;
  }

  return direction;
};

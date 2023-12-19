import { Position } from "./Position.ts";

export enum Direction {
  Up,
  Right,
  Down,
  Left,
}

export const turnLeft = (direction: Direction): Direction =>
  (direction - 1 + 4) % 4;

export const turnRight = (direction: Direction): Direction =>
  (direction + 1) % 4;

export const getOppositeDirection = (direction: Direction): Direction =>
  (direction + 2) % 4;

export const isOppositeDirection = (a: Direction, b: Direction): boolean =>
  a === getOppositeDirection(b);

export const directionToChar = (direction: Direction): string | undefined => {
  switch (direction) {
    case Direction.Down:
      return "v";
    case Direction.Up:
      return "^";
    case Direction.Left:
      return "<";
    case Direction.Right:
      return ">";
    default:
      return undefined;
  }
};

export const toVector = (direction: Direction): Position => {
  switch (direction) {
    case Direction.Up:
      return { column: 0, row: -1 };
    case Direction.Down:
      return { column: 0, row: 1 };
    case Direction.Left:
      return { column: -1, row: 0 };
    case Direction.Right:
      return { column: 1, row: 0 };
  }
};

export const toDirection = (vector: Position): Direction => {
  switch (vector) {
    case { column: 0, row: -1 }:
      return Direction.Up;
    case { column: 0, row: 1 }:
      return Direction.Down;
    case { column: -1, row: 0 }:
      return Direction.Left;
    case { column: 1, row: 0 }:
      return Direction.Right;
    default:
      throw new Error(
        "Cannot convert vector to direction, invalid direction: " +
          JSON.stringify(vector),
      );
  }
};

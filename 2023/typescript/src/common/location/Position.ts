import { Direction, toDirection, toVector } from "./Direction.ts";

export interface Position {
  row: number;
  column: number;
}

export const getNextPosition = (
  position: Position,
  direction: Direction,
): Position => addPosition(position, toVector(direction));

export const getDirectionBetween = (
  from: Position,
  to: Position,
): Direction | undefined => toDirection(subPosition(to, from));

export const getBoundedStraightNeighbours = (
  position: Position,
  numRows: number,
  numColumns: number,
): Array<Position> =>
  straightNeighbours
    .map((s) => addPosition(position, s))
    .filter(isWithinBounds(numRows, numColumns));

export const isWithinBounds =
  (numRows: number, numColumns: number) => (position: Position) =>
    position.row >= 0 &&
    position.row < numRows &&
    position.column >= 0 &&
    position.column < numColumns;

export const straightNeighbours: Array<Position> = [
  { column: 0, row: -1 },
  { column: 0, row: 1 },
  { column: -1, row: 0 },
  { column: 1, row: 0 },
];

export const addPosition = (a: Position, b: Position): Position => ({
  row: a.row + b.row,
  column: a.column + b.column,
});

export const subPosition = (a: Position, b: Position): Position => ({
  row: a.row - b.row,
  column: a.column - b.column,
});

export const arePositionsEqual = (a: Position, b: Position): boolean =>
  a.row === b.row && a.column === b.column;

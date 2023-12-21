import { Direction, toDirection, toVector } from "./Direction.ts";

export interface Position {
  row: RowIndex;
  column: ColumnIndex;
}

export interface BoundingBox {
  minColumn: number;
  maxColumn: number;
  minRow: number;
  maxRow: number;
}

export type ColumnIndex = number;
export type RowIndex = number;

export type PositionMap<T> = Record<ColumnIndex, Record<RowIndex, T>>;

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

export const getPositionMax = (a: Position, b: Position): Position => {
  return {
    row: Math.max(a.row, b.row),
    column: Math.max(a.column, b.column),
  };
};

export const getBoundingBoxForPositionMap = (
  map: PositionMap<unknown>,
): BoundingBox => {
  const columnIndices = Object.keys(map).map((p) => parseInt(p));
  columnIndices.sort();

  const lowestRowPerColumn = columnIndices.map((columnIndex) => {
    const rowIndices = Object.keys(map[columnIndex]).map((p) => parseInt(p));
    rowIndices.sort();
    return rowIndices[0];
  });

  const highestRowPerColumn = columnIndices.map((columnIndex) => {
    const rowIndices = Object.keys(map[columnIndex]).map((p) => parseInt(p));
    rowIndices.sort();
    return rowIndices[0];
  });

  lowestRowPerColumn.sort();
  highestRowPerColumn.sort();

  return {
    minColumn: columnIndices[0],
    minRow: lowestRowPerColumn[0],
    maxColumn: columnIndices[columnIndices.length - 1],
    maxRow: highestRowPerColumn[highestRowPerColumn.length - 1],
  };
};

export const extendBoundingBoxWithPosition = (
  boundingBox: BoundingBox,
  position: Position,
): BoundingBox => ({
  minColumn: Math.min(boundingBox.minColumn, position.column),
  minRow: Math.min(boundingBox.minRow, position.row),
  maxColumn: Math.max(boundingBox.maxColumn, position.column),
  maxRow: Math.max(boundingBox.maxRow, position.row),
});

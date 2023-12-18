import { Direction } from "./Direction.ts";

export interface Position {
  row: number;
  column: number;
}

export const getNextPosition = (
  position: Position,
  direction: Direction,
): Position => {
  const next = { ...position };
  switch (direction) {
    case "left":
      next.column--;
      return next;
    case "right":
      next.column++;
      return next;
    case "up":
      next.row--;
      return next;
    case "down":
      next.row++;
      return next;
  }
};

export const getDirectionBetween = (
  from: Position,
  to: Position,
): Direction | undefined => {
  if (to.row === from.row && to.column === from.column - 1) {
    return "left";
  }
  if (to.row === from.row && to.column === from.column + 1) {
    return "right";
  }
  if (to.row === from.row - 1 && to.column === from.column) {
    return "up";
  }
  if (to.row === from.row + 1 && to.column === from.column) {
    return "down";
  }
};

export const getFourNeighbours = (
  position: Position,
  numRows: number,
  numColumns: number,
): Array<Position> => {
  const list: Array<Position> = [];
  if (position.row > 0) {
    list.push({ row: position.row - 1, column: position.column });
  }
  if (position.row < numRows - 1) {
    list.push({ row: position.row + 1, column: position.column });
  }
  if (position.column > 0) {
    list.push({ row: position.row, column: position.column - 1 });
  }
  if (position.column < numColumns - 1) {
    list.push({ row: position.row, column: position.column + 1 });
  }
  return list;
};

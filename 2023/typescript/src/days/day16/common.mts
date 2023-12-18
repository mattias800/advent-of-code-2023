import { getNextPosition, Position } from "../../common/location/Position.ts";
import { Direction } from "../../common/location/Direction.ts";

export type MirrorDictionary = Record<number, Record<number, Mirror>>;
export type EnergyDictionary = Record<
  number,
  Record<number, Record<Direction, "#" | undefined>>
>;

export interface Grid {
  mirrors: MirrorDictionary;
  numRows: number;
  numColumns: number;
}

export type Mirror = "\\" | "/" | "|" | "-";

export const parseInput = (input: string): Grid => {
  const rows = input
    .trim()
    .split("\n")
    .filter((p) => p)
    .map((p) => p.trim());

  const mirrors = rows.reduce<MirrorDictionary>((sum, line, row) => {
    for (let column = 0; column < line.length; column++) {
      const char = line.charAt(column);
      if ("\\/|-".includes(char)) {
        sum[column] = sum[column] ?? {};
        sum[column][row] = char as Mirror;
      }
    }
    return sum;
  }, {});

  return {
    mirrors,
    numColumns: rows.length,
    numRows: rows[0].length,
  };
};

export const traverse = (
  position: Position,
  arrivalDirection: Direction,
  grid: Grid,
  energy: EnergyDictionary,
): void => {
  if (
    position.row < 0 ||
    position.row >= grid.numRows ||
    position.column < 0 ||
    position.column >= grid.numColumns
  ) {
    return;
  }

  if (energy[position.column]?.[position.row]?.[arrivalDirection] === "#") {
    return;
  }

  energy[position.column] = energy[position.column] || {};
  energy[position.column][position.row] =
    energy[position.column][position.row] || {};
  energy[position.column][position.row][arrivalDirection] = "#";

  const tile = grid.mirrors[position.column][position.row];
  const t = (direction: Direction) =>
    traverse(getNextPosition(position, direction), direction, grid, energy);

  if (tile == null) {
    return t(arrivalDirection);
  }

  if (arrivalDirection === "up") {
    switch (tile) {
      case "|":
        t("up");
        return;
      case "-":
        t("left");
        t("right");
        return;
      case "/":
        t("right");
        return;
      case "\\":
        t("left");
        return;
    }
  }
  if (arrivalDirection === "down") {
    switch (tile) {
      case "|":
        t("down");
        return;
      case "-":
        t("left");
        t("right");
        return;
      case "/":
        t("left");
        return;
      case "\\":
        t("right");
        return;
    }
  }

  if (arrivalDirection === "left") {
    switch (tile) {
      case "|":
        t("up");
        t("down");
        return;
      case "-":
        t("left");
        return;
      case "/":
        t("down");
        return;
      case "\\":
        t("up");
        return;
    }
  }

  if (arrivalDirection === "right") {
    switch (tile) {
      case "|":
        t("up");
        t("down");
        return;
      case "-":
        t("right");
        return;
      case "/":
        t("up");
        return;
      case "\\":
        t("down");
        return;
    }
  }
};

export const countEnergizedTiles = (
  grid: Grid,
  energy: EnergyDictionary,
): number => {
  let r = 0;
  for (let column = 0; column < grid.numColumns; column++) {
    for (let row = 0; row < grid.numRows; row++) {
      if (energy[column]?.[row] != null) {
        r++;
      }
    }
  }
  return r;
};

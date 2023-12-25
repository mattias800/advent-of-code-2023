import {
  getBoundedStraightNeighbours,
  Position,
  PositionMap,
} from "../../common/location/Position.ts";

export interface Garden {
  maps: PositionMap<GardenTile>;
}

export interface GardenTile {
    prevNumReachedPlots: Array<number>;
    gardenMap: GardenMap | undefined;
    done: boolean;
}

export interface GardenMap {
  stones: PositionMap<"#">;
  reachedPlots: PositionMap<"O">;
  numRows: number;
  numColumn: number;
  start: Position;
}

export const parseInput = (input: string): GardenMap => {
  const rows = input
    .trim()
    .split("\n")
    .filter((p) => p)
    .map((p) => p.trim());

  const reachedPlots: PositionMap<"O"> = {};
  const stones: PositionMap<"#"> = {};

  let start: Position = { column: -1, row: -1 };

  for (let row = 0; row < rows.length; row++) {
    for (let column = 0; column < rows[row].length; column++) {
      if (rows[row].charAt(column) === "#") {
        stones[column] = stones[column] || {};
        stones[column][row] = "#";
      }
      if (rows[row].charAt(column) === "S") {
        reachedPlots[column] = reachedPlots[column] || {};
        reachedPlots[column][row] = "O";
        start = {
          column,
          row,
        };
      }
    }
  }

  return {
    stones,
    reachedPlots,
    start,
    numRows: rows.length,
    numColumn: rows[0].length,
  };
};

export const toggleNeighbours = (
  gardenMap: GardenMap,
  reachedPlots: PositionMap<"O">,
): PositionMap<"O"> => {
  const result: PositionMap<"O"> = {};

  const columns = Object.keys(reachedPlots).map((p) => parseInt(p));

  columns.forEach((column) => {
    const rows = Object.keys(reachedPlots[column]).map((p) => parseInt(p));
    rows.forEach((row) => {
      const neighbours = getBoundedStraightNeighbours(
        { column, row },
        gardenMap.numRows,
        gardenMap.numColumn,
      );
      neighbours.forEach((n) => {
        if (gardenMap.stones[n.column]?.[n.row] == null) {
          result[n.column] = result[n.column] || {};
          result[n.column][n.row] = "O";
        }
      });
    });
  });

  return result;
};

export const countReachedPlots = (reachedPlots: PositionMap<"O">): number => {
  let result = 0;

  const columns = Object.keys(reachedPlots).map((p) => parseInt(p));

  columns.forEach((column) => {
    const rows = Object.keys(reachedPlots[column]).map((p) => parseInt(p));
    result += rows.length;
  });

  return result;
};

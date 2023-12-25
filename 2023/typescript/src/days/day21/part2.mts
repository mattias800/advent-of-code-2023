import { countReachedPlots, GardenMap, parseInput } from "./common.mjs";
import {
  getBoundedStraightNeighbours,
  getNonBoundedStraightNeighbours,
  PositionMap,
} from "../../common/location/Position.ts";

export const getSolution = (input: string): number => {
  const gardenMap = parseInput(input);

  let r = toggleNeighbours(gardenMap, gardenMap.reachedPlots);
  for (let i = 1; i < 128 * 2; i++) {
    r = toggleNeighbours(gardenMap, r);
    console.log(countReachedPlots(r));
  }

  return countReachedPlots(r);
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
      const neighbours = getNonBoundedStraightNeighbours({ column, row });

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

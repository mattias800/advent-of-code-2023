import { countEnergizedTiles, parseInput, traverse } from "./common.mjs";
import { Direction } from "../../common/location/Direction.ts";

export const getSolution = (input: string): number => {
  const g = parseInput(input);
  const e = {};
  traverse({ row: 0, column: 0 }, Direction.Right, g, e);
  return countEnergizedTiles(g, e);
};

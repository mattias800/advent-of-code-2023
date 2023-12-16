import { countEnergizedTiles, parseInput, traverse } from "./common.mjs";

export const getSolution = (input: string): number => {
  const g = parseInput(input);
  const e = {};
  traverse({ row: 0, column: 0 }, "right", g, e);
  return countEnergizedTiles(g, e);
};

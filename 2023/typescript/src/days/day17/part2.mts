import { getMinimalHeatLoss, parseInput } from "./common.mjs";

export const getSolution = (input: string): number => {
  const s = parseInput(input);
  return getMinimalHeatLoss(s, 4, 10);
};

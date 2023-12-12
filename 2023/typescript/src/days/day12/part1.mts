import { getNumCombinations, parseInput } from "./common.mjs";

export const getSolution = (input: string): number => {
  return parseInput(input)
    .map((doc) => getNumCombinations(doc.pattern, doc.groups))
    .reduce((sum, item) => sum + item, 0);
};

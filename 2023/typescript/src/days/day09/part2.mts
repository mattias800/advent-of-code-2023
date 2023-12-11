import { parseInput, predictPrevious } from "./common.mjs";

export const part2 = (input: string) => {
  const solution = getSolution(input);

  console.log("Part 2 solution: " + solution);
};

export const getSolution = (input: string): number => {
  const data = parseInput(input);

  return data
    .map((d) => predictPrevious(d))
    .reduce((sum, item) => sum + item, 0);
};

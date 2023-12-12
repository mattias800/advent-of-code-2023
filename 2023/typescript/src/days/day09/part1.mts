import { parseInput, predictNext } from "./common.mts";

export const part1 = (input: string) => {
  const solution = getSolution(input);

  console.log("Part 1 solution: " + solution);
};

export const getSolution = (input: string): number => {
  const data = parseInput(input);

  return data.map((d) => predictNext(d)).reduce((sum, item) => sum + item, 0);
};

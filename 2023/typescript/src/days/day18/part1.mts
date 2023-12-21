import { blaaa, parseInput } from "./common.mjs";

export const getSolution = (input: string): number => {
  const commands = parseInput(input);
  return blaaa(commands);
};

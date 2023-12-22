import {
  getMachinePartRating,
  parseInput,
  processMachinePart,
} from "./common.mjs";

export const getSolution = (input: string): number => {
  const system = parseInput(input);

  return system.machineParts
    .map((machinePart) => ({
      result: processMachinePart(machinePart, system.workflows),
      rating: getMachinePartRating(machinePart),
    }))
    .filter((p) => p.result === "A")
    .reduce((sum, item) => sum + item.rating, 0);
};

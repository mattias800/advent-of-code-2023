import { countReachedPlots, parseInput, toggleNeighbours } from "./common.mjs";

export const getSolution = (input: string, numSteps: number): number => {
  const gardenMap = parseInput(input);

  let r = toggleNeighbours(gardenMap, gardenMap.reachedPlots);
  for (let i = 1; i < numSteps; i++) {
    r = toggleNeighbours(gardenMap, r);
  }

  return countReachedPlots(r);
};

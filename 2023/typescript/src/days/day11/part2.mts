import { parseGalaxyMap, totalDistanceBetweenAll } from "./common.mjs";

export const getSolution = (input: string): number => {
  const galaxyMap = parseGalaxyMap(input);
  return totalDistanceBetweenAll(galaxyMap, 999999);
};

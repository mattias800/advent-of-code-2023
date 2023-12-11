import {
  findStart,
  findStartDirections,
  findTotalLength,
  parseTileMap,
} from "./common.mjs";

export const getSolution = (input: string): number => {
  const tileMap = parseTileMap(input);
  const start = findStart(tileMap);
  const startDirections = findStartDirections(tileMap);

  const totalLength = findTotalLength(start, startDirections[0], tileMap);

  return totalLength / 2;
};

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
  console.log(startDirections);
  const totalLength = findTotalLength(start, startDirections[0], tileMap);
  console.log(totalLength);
  return totalLength / 2;
};

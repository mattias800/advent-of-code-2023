import {
  findHorizontalMirrorLine,
  findVerticalMirrorLine,
  parseInput,
} from "./common.mjs";

export const getSolution = (input: string): number => {
  const maps = parseInput(input);

  const verticals = maps
    .map((m) => findVerticalMirrorLine(m))
    .map((p) => (p != null ? p + 1 : 0))
    .reduce((sum, item) => sum + item, 0);

  const horizontals = maps
    .map((m) => findHorizontalMirrorLine(m))
    .map((p) => (p != null ? (p + 1) * 100 : 0))
    .reduce((sum, item) => sum + item, 0);

  return verticals + horizontals;
};

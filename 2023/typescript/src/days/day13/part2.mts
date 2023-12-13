import {
  findMirrorColumnWithMismatch,
  findMirrorRowWithMismatch,
  parseInput,
} from "./common.mjs";

export const getSolution = (input: string): number => {
  const maps = parseInput(input);

  const verticals = maps
    .map((m) => findMirrorColumnWithMismatch(m, 1))
    .map((p) => (p != null ? p + 1 : 0))
    .reduce((sum, item) => sum + item, 0);

  const horizontals = maps
    .map((m) => findMirrorRowWithMismatch(m, 1))
    .map((p) => (p != null ? (p + 1) * 100 : 0))
    .reduce((sum, item) => sum + item, 0);

  return verticals + horizontals;
};

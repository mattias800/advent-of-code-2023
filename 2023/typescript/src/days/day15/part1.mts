import { getAsciiHash } from "./common.mjs";

export const getSolution = (input: string): number => {
  return input
    .trim()
    .split(",")
    .filter((p) => p)
    .map((p) => p.trim())
    .map((p) => getAsciiHash(p))
    .reduce((sum, item) => sum + item, 0);
};

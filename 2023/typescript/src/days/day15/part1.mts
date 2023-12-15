import { getAsciiHash } from "./common.mjs";

export const getSolution = (input: string): number => {
  return input
    .split(",")
    .flatMap((s) => s.split("\n"))
    .map((p) => getAsciiHash(p))
    .reduce((sum, item) => sum + item, 0);
};

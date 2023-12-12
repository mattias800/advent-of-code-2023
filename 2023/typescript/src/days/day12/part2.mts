import { count, Doc, parseInput } from "./common.mts";

export const getSolution = (input: string): number =>
  parseInput(input)
    .map(unfoldDoc)
    .map((doc) => count(doc.pattern, doc.groups))
    .reduce((sum, item) => sum + item, 0);

export const unfoldDoc = (doc: Doc): Doc => {
  return {
    pattern: Array(5).fill(doc.pattern).join("?"),
    groups: Array(5)
      .fill(doc.groups)
      .flatMap((p) => p),
  };
};

import { count, Doc, parseInput } from "./common.mts";

export const getSolution = (input: string): number => {
  const docs = parseInput(input).map(unfoldDoc);

  let sum = 0;

  for (let i = 0; i < 10; i++) {
    console.log("Working on: " + i);
    setTimeout(() => {
      const doc = docs[i];
      sum += count(doc.pattern, doc.groups);
    }, 10);
  }

  return sum;
};

export const unfoldDoc = (doc: Doc): Doc => {
  return {
    pattern: Array(5).fill(doc.pattern).join("?"),
    groups: Array(5)
      .fill(doc.groups)
      .flatMap((p) => p),
  };
};

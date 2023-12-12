import { createNodeDic, traverse } from "./common.mts";

export const part1 = (input: string) => {
  const solution = getSolution(input);

  console.log("Part 1 solution: " + solution);
};

export const getSolution = (input: string): number => {
  const [lr, ...nodeLines] = input.split("\n").filter((p) => p);
  const nodeDic = createNodeDic(nodeLines);
  return traverse(nodeDic["AAA"], nodeDic, lr);
};

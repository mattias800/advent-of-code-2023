import {
  createNodeDic,
  NodeByName,
  traverse,
  traverseEndingZ,
} from "./common.mts";

export const part2 = (input: string) => {
  const solution = getSolution(input);

  console.log("Part 2 solution: " + solution);
};

export const getSolution = (input: string): number => {
  const [lr, ...nodeLines] = input.split("\n").filter((p) => p);
  const nodeDic = createNodeDic(nodeLines);
  return traverseAll(nodeDic, lr);
};

export const traverseAll = (dic: NodeByName, lrString: string): number => {
  let startNodes = Object.values(dic).filter((node) => node.name.endsWith("A"));

  const results = startNodes.map((startNode) =>
    traverseEndingZ(startNode, dic, lrString),
  );

  return lcmForList(results);
};

const lcmForList = (numbers: Array<number>): number => {
  return numbers.reduce((sum, item) => {
    if (sum === 0) {
      return item;
    }
    return lcm(sum, item);
  }, 0);
};

const gcd = (a: number, b: number): number => {
  for (let temp = b; b !== 0; ) {
    b = a % b;
    a = temp;
    temp = b;
  }
  return a;
};

const lcm = (a: number, b: number) => {
  const gcdValue = gcd(a, b);
  return (a * b) / gcdValue;
};

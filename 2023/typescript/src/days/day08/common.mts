export interface Node {
  name: string;
  l: string;
  r: string;
}

export type NodeByName = Record<string, Node>;

export const createNodeDic = (nodeLines: Array<string>): NodeByName =>
  nodeLines.reduce<NodeByName>((sum, item) => {
    const node = createNode(item);
    sum[node.name] = node;
    return sum;
  }, {});

export const createNode = (nodeLine: string): Node => {
  const [name, lr] = nodeLine.split("=");

  const [l, r] = lr.replaceAll("(", "").replaceAll(")", "").split(",");

  return {
    name: name.trim(),
    l: l.trim(),
    r: r.trim(),
  };
};

export const traverse = (
  startNode: Node,
  dic: NodeByName,
  lrString: string,
): number => {
  let node = startNode;
  let lrIndex = 0;

  while (node.name !== "ZZZ") {
    const lr = lrString[lrIndex % lrString.length];
    const next = lr === "L" ? node.l : node.r;
    node = dic[next];
    lrIndex++;
  }

  return lrIndex;
};

export const traverseEndingZ = (
  startNode: Node,
  dic: NodeByName,
  lrString: string,
): number => {
  let node = startNode;
  let lrIndex = 0;

  while (!node.name.endsWith("Z")) {
    const lr = lrString[lrIndex % lrString.length];
    const next = lr === "L" ? node.l : node.r;
    node = dic[next];
    lrIndex++;
  }

  return lrIndex;
};

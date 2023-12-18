import {
  getDirectionBetween,
  getFourNeighbours,
  Position,
} from "../../common/location/Position.ts";
import { Direction, directionToChar } from "../../common/location/Direction.ts";

export interface NavigationNode {
  from: Position | undefined;
  position: Position;
  isStartNode: boolean;
}

export interface Node {
  position: Position;
  heatLoss: number;
  isStartNode: boolean;

  // Dijkstra
  shortestDistance: number;
  from: Position | undefined;
  previousDirections: Array<Direction>;

  neighbours: Array<Position>;

  // Done state
  numChecks: number;
  done: boolean;

  // A*
  birdDistance: number;
}

export type PriorityQueue = Array<Node>;

export const parseInput = (input: string): Array<string> =>
  input
    .trim()
    .split("\n")
    .filter((p) => p)
    .map((s) => s.trim());

export const createPriorityQueue = (lines: Array<string>): PriorityQueue => {
  let queue: PriorityQueue = [];
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    for (let column = 0; column < line.length; column++) {
      const heatLoss = parseInt(lines[row].charAt(column));
      const shortestDistance = row === 0 && column === 0 ? 0 : Infinity;

      queue.push({
        isStartNode: column === 0 && row === 0,
        position: { column, row },
        heatLoss,
        neighbours: getFourNeighbours(
          { column, row },
          lines.length,
          lines[0].length,
        ),
        birdDistance: lines.length - row + (line.length - column),
        shortestDistance: shortestDistance,
        from: undefined,
        numChecks: 0,
        done: false,
        previousDirections: [],
      });
    }
  }
  return queue;
};

export const byShortestDijkstra = (a: Node, b: Node): number =>
  a.shortestDistance - b.shortestDistance;

export const byShortestAStar = (a: Node, b: Node): number =>
  a.shortestDistance + a.birdDistance - (b.shortestDistance + b.birdDistance);

export const start = (queue: PriorityQueue) => {
  for (let i = 0; i < 10000; i++) {
    queue.sort(byShortestDijkstra);

    const node = queue.find((p) => !p.done);

    if (node == null) {
      console.log("Done after " + i + " increments.");
      return;
    }

    calculateDistancesToNeighbours(node, queue);
  }
};

export const calculateHeatLoss = (node: Node, queue: PriorityQueue): number => {
  if (node.isStartNode) {
    return 0;
  }

  if (node.from) {
    const next = getNodeByPosition(queue, node.from);
    if (!next) {
      throw new Error(
        "Unable to calculate heat loss, could not find node at from position.",
      );
    }
    return node.shortestDistance + calculateHeatLoss(next, queue);
  } else {
    throw new Error("Unable to calculate heat loss, node has no from-node.");
  }
};

export const calculateDistancesToNeighbours = (
  node: Node,
  queue: PriorityQueue,
) => {
  if (node.done) {
    return;
  }

  const neighbours = getAllNeighbours(node, queue).filter(
    (n) => !isPreviousMovementStraight(node.previousDirections, n.direction),
  );

  for (let i = 0; i < neighbours.length; i++) {
    const { neighbour } = neighbours[i];

    if (neighbour.done) {
      continue;
    }

    neighbour.numChecks++;
    if (neighbour.numChecks >= neighbour.neighbours.length) {
      neighbour.done = true;
    }
    node.numChecks++;
    if (node.numChecks >= node.neighbours.length) {
      node.done = true;
    }

    if (
      neighbour.shortestDistance === Infinity ||
      node.shortestDistance + neighbour.heatLoss <= neighbour.shortestDistance
    ) {
      neighbour.shortestDistance = node.shortestDistance + neighbour.heatLoss;
      neighbour.from = node.position;
      neighbour.previousDirections = calculatePreviousDirections(
        queue,
        neighbour,
      );
    }
  }
};

export const getAllNeighbours = (
  node: Node,
  queue: PriorityQueue,
): Array<{ neighbour: Node; direction: Direction }> => {
  let list: Array<{ neighbour: Node; direction: Direction }> = [];

  pushValue(
    list,
    "up",
    queue.find(
      (p) =>
        p.position.row === node.position.row - 1 &&
        p.position.column === node.position.column,
    ),
  );

  pushValue(
    list,
    "down",
    queue.find(
      (p) =>
        p.position.row === node.position.row + 1 &&
        p.position.column === node.position.column,
    ),
  );

  pushValue(
    list,
    "left",
    queue.find(
      (p) =>
        p.position.row === node.position.row &&
        p.position.column === node.position.column - 1,
    ),
  );

  pushValue(
    list,
    "right",
    queue.find(
      (p) =>
        p.position.row === node.position.row &&
        p.position.column === node.position.column + 1,
    ),
  );

  return list;
};

const pushValue = (
  list: Array<{ neighbour: Node; direction: Direction }>,
  direction: Direction,
  neighbour: Node | undefined,
) => {
  if (neighbour != null) {
    list.push({ neighbour, direction });
  }
};

export const isPreviousMovementStraight = (
  previousDirections: Array<Direction>,
  nextDirection: Direction,
): boolean => {
  if (previousDirections.length < 3) {
    return false;
  }
  return (
    previousDirections[previousDirections.length - 1] === nextDirection &&
    previousDirections[previousDirections.length - 2] === nextDirection &&
    previousDirections[previousDirections.length - 3] === nextDirection
  );
};

export const getNodeByPosition = <T extends NavigationNode>(
  queue: Array<T>,
  position: Position,
): T | undefined =>
  queue.find(
    (node) =>
      node.position.row === position.row &&
      node.position.column === position.column,
  );

export const calculatePreviousDirections = (
  queue: Array<NavigationNode>,
  node: NavigationNode,
): Array<Direction> => {
  console.log("--- calculatePreviousDirections")
  console.log("--- calculatePreviousDirections")
  console.log("--- calculatePreviousDirections")
  console.log("--- calculatePreviousDirections")
  const list: Array<Direction> = [];
  cpd(queue, node, list);
  return list;
};

export const cpd = (
  queue: Array<NavigationNode>,
  node: NavigationNode,
  result: Array<Direction>,
) => {
  console.log(node)
  if (node.from == null) {
    throw new Error(
      "Cannot calculate previous directions, not completed path.",
    );
  }
  const prevNode = getNodeByPosition(queue, node.from);
  if (prevNode == null) {
    throw new Error(
      "Cannot calculate previous directions, could not find previous node.",
    );
  }

  const d = getDirectionBetween(prevNode.position, node.position);

  if (d == null) {
    throw new Error(
      "Cannot calculate previous directions, could not find direction.",
    );
  }

  result.unshift(d);

  if (!prevNode.isStartNode) {
    cpd(queue, prevNode, result);
  }
};

export const decorateInputWithPath = (
  input: string,
  queue: PriorityQueue,
  destinationPosition: Position,
): string => {
  const lines = parseInput(input);

  const pos = getNodeByPosition(queue, destinationPosition);

  if (pos == null) {
    throw new Error("Could not decorate with path, found no end node.");
  }

  decorate(lines, queue, pos);

  return lines.join("\n");
};

const decorate = (lines: Array<string>, queue: PriorityQueue, node: Node) => {
  lines[node.position.row] = replaceInString(
    lines[node.position.row],
    node.position.column,
    directionToChar(
      node.previousDirections[node.previousDirections.length - 1],
    ) ?? "*",
  );

  console.log(node);
  if (node.isStartNode) {
    return;
  }

  if (node.from == null) {
    throw new Error("Found empty from.");
  }

  const next = getNodeByPosition(queue, node.from);

  if (next == null) {
    throw new Error("Found no next.");
  }

  decorate(lines, queue, next);
};

export const replaceInString = (
  s: string,
  index: number,
  replacement: string,
) =>
  s.substring(0, index) + replacement + s.substring(index + replacement.length);

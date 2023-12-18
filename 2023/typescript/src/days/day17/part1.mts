import {
  createPriorityQueue,
  decorateInputWithPath,
  getNodeByPosition,
  parseInput,
  start,
} from "./common.mjs";
import { Position } from "../../common/location/Position.ts";

export const getSolution = (input: string): number => {
  const s = parseInput(input);
  const queue = createPriorityQueue(s);

  start(queue);

  const destinationPosition = {
    row: s.length - 1,
    column: s[0].length - 1,
  };

  const destinationNode = getNodeByPosition(queue, destinationPosition);

  const decorated = decorateInputWithPath(input, queue, destinationPosition);
  console.log(decorated);

  if (destinationNode == null) {
    throw new Error("Ehmm, no destination node?");
  }

  return destinationNode.shortestDistance;
};

export const getSolutionForPosition = (
  input: string,
  position: Position,
): number => {
  const s = parseInput(input);
  const queue = createPriorityQueue(s);

  start(queue);

  const destinationNode = getNodeByPosition(queue, position);

  const decorated = decorateInputWithPath(input, queue, position);
  console.log(decorated);

  if (destinationNode == null) {
    throw new Error("Ehmm, no destination node?");
  }

  return destinationNode.shortestDistance;
};

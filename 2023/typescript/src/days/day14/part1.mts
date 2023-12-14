import { countBoardWeight, parseInput, slideBoard } from "./common.mjs";

export const getSolution = (input: string): number => {
  const board = parseInput(input);
  slideBoard(board, "north");
  return countBoardWeight(board);
};

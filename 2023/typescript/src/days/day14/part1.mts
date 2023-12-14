import {boardToString, countBoardWeight, parseInput, slideBoard} from "./common.mjs";

export const getSolution = (input: string): number => {
  const board = parseInput(input);
  console.log(boardToString(board));
  slideBoard(board);
  console.log("")
  console.log("--- Slide ---")
  console.log("")
  console.log(boardToString(board));
  return countBoardWeight(board);
};

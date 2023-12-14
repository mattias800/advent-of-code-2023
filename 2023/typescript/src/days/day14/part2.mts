import {
  Board,
  boardsAreEqual,
  cloneBoard,
  countBoardWeight,
  parseInput,
  slideBoardOneCycle,
} from "./common.mjs";

export const getSolution = (input: string): number => {
  let board = parseInput(input);
  const history: Array<Board> = [];

  let historyHitIndex = -1;
  let historyPointer = -1;

  for (let i = 0; i < 1000; i++) {
    if (historyHitIndex >= 0) {
      historyPointer++;
      if (historyPointer >= history.length) {
        historyPointer = historyHitIndex;
      }
    } else {
      board = slideBoardOneCycle(board);

      const historyIndex = history.findIndex((h) => boardsAreEqual(h, board));

      if (historyIndex >= 0) {
        historyHitIndex = historyIndex;
        historyPointer = historyIndex;
        break;
      }

      history.push(cloneBoard(board));
    }
  }

  if (historyPointer < 0) {
    throw new Error("Found no history loop.");
  }

  const loopSize = history.length - historyHitIndex;
  const stepsToRunInLoop = 1000000000 - historyHitIndex;
  const cyclesToRunAfterLoop = stepsToRunInLoop % loopSize;

  const boardFromHistory = history[historyHitIndex + cyclesToRunAfterLoop - 1];
  return countBoardWeight(boardFromHistory);
};

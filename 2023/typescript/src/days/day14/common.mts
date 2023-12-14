type Rock = "O" | "#";
type Direction = "north" | "east" | "south" | "west";

export interface Board {
  stones: Record<number, Record<number, Rock | undefined>>;
  numColumns: number;
  numRows: number;
}

export const parseInput = (input: string): Board => {
  const lines = input
    .split("\n")
    .filter((p) => p)
    .map((p) => p.trim());

  return lines.reduce<Board>(
    (sum, line, row) => {
      for (let column = 0; column < line.length; column++) {
        const ch = line.charAt(column);
        if (ch !== ".") {
          sum.stones[column] = sum.stones[column] ?? {};
          sum.stones[column][row] = ch as Rock;
        }
      }
      return sum;
    },
    {
      stones: {},
      numColumns: lines[0].length,
      numRows: lines.length,
    },
  );
};

export const slideBoardOneCycle = (board: Board): Board => {
  slideBoard(board, "north");
  slideBoard(board, "west");
  slideBoard(board, "south");
  slideBoard(board, "east");
  return board;
};

export const slideBoard = (board: Board, direction: Direction) => {
  for (let column = 0; column < board.numColumns; column++) {
    if (direction === "north" || direction === "south") {
      slideRocksInColumn(board, column, direction);
    } else {
      slideRocksInRow(board, column, direction);
    }
  }
};

export const slideRocksInColumn = (
  board: Board,
  column: number,
  direction: "north" | "south",
) => {
  if (direction === "north") {
    for (let row = 1; row < board.numRows; row++) {
      slideRock(board, column, row, "north");
    }
  } else if (direction === "south") {
    for (let row = board.numRows - 2; row >= 0; row--) {
      slideRock(board, column, row, "south");
    }
  }
};

export const slideRocksInRow = (
  board: Board,
  row: number,
  direction: "west" | "east",
) => {
  if (direction === "west") {
    for (let column = 1; column < board.numRows; column++) {
      slideRock(board, column, row, direction);
    }
  } else if (direction === "east") {
    for (let column = board.numRows - 2; column >= 0; column--) {
      slideRock(board, column, row, direction);
    }
  }
};

export const slideRock = (
  board: Board,
  column: number,
  row: number,
  direction: Direction,
) => {
  if (direction === "north" && row === 0) {
    return;
  }
  if (direction === "south" && row === board.numRows - 1) {
    return;
  }
  if (direction === "west" && column === 0) {
    return;
  }
  if (direction === "east" && column === board.numColumns - 1) {
    return;
  }

  const nextRow =
    direction === "north" ? row - 1 : direction === "south" ? row + 1 : row;

  const nextColumn =
    direction === "west"
      ? column - 1
      : direction === "east"
        ? column + 1
        : column;

  if (board.stones[column]?.[row] === "O") {
    if (board.stones[nextColumn]?.[nextRow] == null) {
      board.stones[nextColumn] = board.stones[nextColumn] ?? {};
      board.stones[nextColumn][nextRow] = "O";
      board.stones[column][row] = undefined;
      slideRock(board, nextColumn, nextRow, direction);
    }
  }
};

export const countBoardWeight = (board: Board): number => {
  let weight = 0;
  for (let column = 0; column <= board.numColumns; column++) {
    for (let row = 0; row <= board.numRows; row++) {
      if (board.stones[column]?.[row] === "O") {
        weight += board.numRows - row;
      }
    }
  }
  return weight;
};

export const boardToString = (board: Board): string => {
  const s = Array<string>(board.numColumns).fill("");

  for (let row = 0; row < board.numRows; row++) {
    for (let column = 0; column < board.numColumns; column++) {
      if (board.stones[column]?.[row] === "O") {
        s[row] += "O";
      } else if (board.stones[column]?.[row] === "#") {
        s[row] += "#";
      } else {
        s[row] += ".";
      }
    }
  }

  return s.join("\n");
};

export const boardsAreEqual = (boardA: Board, boardB: Board): boolean => {
  for (let row = 0; row < boardA.numRows; row++) {
    for (let column = 0; column < boardA.numColumns; column++) {
      if (boardA.stones[column]?.[row] !== boardB.stones[column]?.[row]) {
        return false;
      }
    }
  }
  return true;
};

export const cloneBoard = (board: Board): Board => {
  let clone: Board = {
    numRows: board.numRows,
    numColumns: board.numColumns,
    stones: {},
  };
  for (let column = 0; column < board.numColumns; column++) {
    for (let row = 0; row < board.numRows; row++) {
      const stone = board.stones[column]?.[row];
      if (stone != null) {
        clone.stones[column] = clone.stones[column] || {};
        clone.stones[column][row] = stone;
      }
    }
  }
  return clone;
};

type Rock = "O" | "#";
interface Board {
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

export const slideBoard = (board: Board): Board => {
  for (let column = 0; column < board.numColumns; column++) {
    slideRocksInColumn(board, column);
  }
};

export const slideRocksInColumn = (board: Board, column: number): Board => {
  for (let row = 1; row < board.numRows; row++) {
    slideRock(board, column, row);
  }
};

export const slideRock = (board: Board, column: number, row: number): Board => {
  if (row === 0) {
    return board;
  }
  if (board.stones[column]?.[row] === "O") {
    if (board.stones[column]?.[row - 1] == null) {
      board.stones[column][row - 1] = "O";
      board.stones[column][row] = undefined;
      slideRock(board, column, row - 1);
    }
  }
  return board;
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

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

export const slideRocks = (board: Board, column: number): Board => {

};

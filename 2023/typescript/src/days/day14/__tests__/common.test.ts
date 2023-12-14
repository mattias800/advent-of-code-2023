import { boardToString, parseInput, slideBoardOneCycle } from "../common.mjs";

describe("Day 14 Common", () => {
  const testdata =
    "O....#....\n" +
    "O.OO#....#\n" +
    ".....##...\n" +
    "OO.#O....O\n" +
    ".O.....O#.\n" +
    "O.#..O.#.#\n" +
    "..O..#O..O\n" +
    ".......O..\n" +
    "#....###..\n" +
    "#OO..#....";

  describe("slideBoardOneCycle", () => {
    it("works with test data one cycle", () => {
      let board = parseInput(testdata);
      board = slideBoardOneCycle(board);
      expect(boardToString(board)).toBe(
        ".....#....\n" +
          "....#...O#\n" +
          "...OO##...\n" +
          ".OO#......\n" +
          ".....OOO#.\n" +
          ".O#...O#.#\n" +
          "....O#....\n" +
          "......OOOO\n" +
          "#...O###..\n" +
          "#..OO#....",
      );
    });
    it("works with test data two cycles", () => {
      let board = parseInput(testdata);
      board = slideBoardOneCycle(board);
      board = slideBoardOneCycle(board);
      expect(boardToString(board)).toBe(
        ".....#....\n" +
          "....#...O#\n" +
          ".....##...\n" +
          "..O#......\n" +
          ".....OOO#.\n" +
          ".O#...O#.#\n" +
          "....O#...O\n" +
          ".......OOO\n" +
          "#..OO###..\n" +
          "#.OOO#...O",
      );
    });
    it("works with test data three cycles", () => {
      let board = parseInput(testdata);
      board = slideBoardOneCycle(board);
      board = slideBoardOneCycle(board);
      board = slideBoardOneCycle(board);
      expect(boardToString(board)).toBe(
        ".....#....\n" +
          "....#...O#\n" +
          ".....##...\n" +
          "..O#......\n" +
          ".....OOO#.\n" +
          ".O#...O#.#\n" +
          "....O#...O\n" +
          ".......OOO\n" +
          "#...O###.O\n" +
          "#.OOO#...O",
      );
    });
  });
});

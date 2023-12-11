import { findStart, parseTileMap } from "../common.mts";

describe("Day 10", () => {
  const testInput = ".....\n" + ".S-7.\n" + ".|.|.\n" + ".L-J.\n" + ".....";
  const testTileMap = parseTileMap(testInput);
  describe("day10common", () => {
    describe("findStart", () => {
      it("returns correct position", () => {
        expect(findStart(testTileMap)).toEqual({ row: 1, column: 1 });
      });
    });
  });
});

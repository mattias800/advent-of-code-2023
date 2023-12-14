import { getSolution } from "../part2.mjs";
import fs from "fs";

describe("Day 14 Part 2", () => {
  describe("getSolution", () => {
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

    it("works with test data", () => {
      expect(getSolution(testdata)).toBe(64);
    });

    it("works with input", () => {
      expect(
        getSolution(fs.readFileSync("./src/days/day14/input.txt").toString()),
      ).toBe(95273);
    });
  });
});

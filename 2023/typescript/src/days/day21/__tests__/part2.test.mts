import { getSolution } from "../part2.mjs";
import fs from "fs";

describe("Day 19 Part 2 ", () => {
  describe("getSolution", () => {
    // it("works with test data", () => {
    //   const testdata =
    //     "...........\n" +
    //     ".....###.#.\n" +
    //     ".###.##..#.\n" +
    //     "..#.#...#..\n" +
    //     "....#.#....\n" +
    //     ".##..S####.\n" +
    //     ".##..#...#.\n" +
    //     ".......##..\n" +
    //     ".##.#.####.\n" +
    //     ".##..##.##.\n" +
    //     "...........";
    //   expect(getSolution(testdata)).toBe(16);
    // });
    it("works with input", () => {
      expect(
        getSolution(fs.readFileSync("./src/days/day21/input.txt").toString()),
      ).toBe(3847);
    });
  });
});

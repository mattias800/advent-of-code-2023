import { getSolution } from "../part1.mjs";
import fs from "fs";

describe("Day 16 Part 1", () => {
  describe("getSolution", () => {
    const testdata =
      ".|...\\....\n" +
      "|.-.\\.....\n" +
      ".....|-...\n" +
      "........|.\n" +
      "..........\n" +
      ".........\\\n" +
      "..../.\\\\..\n" +
      ".-.-/..|..\n" +
      ".|....-|.\\\n" +
      "..//.|....";

    it("works with test data", () => {
      expect(getSolution(testdata)).toBe(46);
    });
    it("works with input", () => {
      expect(
        getSolution(fs.readFileSync("./src/days/day16/input.txt").toString()),
      ).toBe(6921);
    });
  });
});

import { getSolution } from "../part2.mjs";
import fs from "fs";

describe("Day 20 Part 2 ", () => {
  describe("getSolution", () => {
    it("works with input", () => {
      expect(
        getSolution(fs.readFileSync("./src/days/day20/input.txt").toString()),
      ).toBe(7286);
    });
  });
});

import { getSolution } from "../part1.mts";
import fs from "fs";

describe("part1", () => {
  describe("getSolution", () => {
    it("works with test data", () => {
      expect(
        getSolution("Time:      7  15   30\n" + "Distance:  9  40  200"),
      ).toBe(288);
    });
    it("works with input", () => {
      expect(
        getSolution(fs.readFileSync("./src/days/day06/input.txt").toString()),
      ).toBe(2374848);
    });
  });
});

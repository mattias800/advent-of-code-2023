import { getSolution } from "../part2.mts";
import fs from "fs";

describe("Day 06", () => {
  describe("Part 2", () => {
    describe("getSolution", () => {
      it("works with test data", () => {
        expect(
          getSolution("Time:      7  15   30\n" + "Distance:  9  40  200"),
        ).toBe(71503);
      });
      // it("works with input", () => {
      //   expect(
      //     getSolution(fs.readFileSync("./src/days/day06/input.txt").toString()),
      //   ).toBe(39132886);
      // });
    });
  });
});

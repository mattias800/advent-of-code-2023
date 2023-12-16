import { getSolution } from "../part2.mjs";
import fs from "fs";

describe("Day 15 Part 2 ", () => {
  describe("getSolution", () => {
    it("works with test data", () => {
      const testdata = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";
      expect(getSolution(testdata)).toBe(145);
    });

    it("works with input", () => {
      expect(
        getSolution(fs.readFileSync("./src/days/day15/input.txt").toString()),
      ).toBe(279470);
    });
  });
});

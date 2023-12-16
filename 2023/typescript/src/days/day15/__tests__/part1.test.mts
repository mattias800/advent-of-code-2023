import { getSolution } from "../part1.mjs";
import fs from "fs";

describe("Day 15 Part 1", () => {
  describe("getSolution", () => {
    const testdata = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";

    it("works with test data", () => {
      expect(getSolution(testdata)).toBe(1320);
    });
    it("works with input", () => {
      expect(
        getSolution(fs.readFileSync("./src/days/day15/input.txt").toString()),
      ).toBe(514639);
    });
  });
});

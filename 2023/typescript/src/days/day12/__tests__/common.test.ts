import { getNumCombinations } from "../common.mjs";

describe("Day 11", () => {
  describe("day11common", () => {
    describe("getNumCombinations", () => {
      it("works with one match", () => {
        expect(getNumCombinations("#", [1])).toBe(1);
      });
      it("works with one unknown match", () => {
        expect(getNumCombinations("?", [1])).toBe(1);
      });
      it("works with one known and one unknown match", () => {
        expect(getNumCombinations("?#", [1])).toBe(1);
      });
      // it("works with three match", () => {
      //   expect(getNumCombinations("#.#.###", [1, 1, 3])).toBe(1);
      // });
    });
  });
});

import {count, getNumCombinations, minPatternLengthForGroups} from "../common.mts";

describe("Day 12", () => {
  describe("day12common", () => {
    describe("minPatternLengthForGroups", () => {
      it("works", () => {
        expect(minPatternLengthForGroups([1, 2, 3])).toBe(8);
      });
    });
    describe("getNumCombinations", () => {
      it("works with #, 1", () => {
        expect(getNumCombinations("#", [1])).toBe(1);
      });
      it("no match with ###, 1", () => {
        expect(getNumCombinations("###", [1])).toBe(0);
      });
      it("three matches with ???, 1", () => {
        expect(getNumCombinations("???", [1])).toBe(3);
      });
      it("match with ????, 2,1", () => {
        expect(getNumCombinations("????", [2, 1])).toBe(1);
      });
      it("works with ###, 3", () => {
        expect(getNumCombinations("###", [3])).toBe(1);
      });
      it("works with ?, 1", () => {
        expect(getNumCombinations("?", [1])).toBe(1);
      });
      it("works with ?#, 1", () => {
        expect(getNumCombinations("?#", [1])).toBe(1);
      });
      it("works with #?, 1", () => {
        expect(getNumCombinations("#?", [1])).toBe(1);
      });
      it("works with ??, 1", () => {
        expect(getNumCombinations("??", [1])).toBe(2);
      });
      it("works with #.#", () => {
        expect(getNumCombinations("#.#", [1, 1])).toBe(1);
      });
      it("works with test data 1", () => {
        expect(getNumCombinations("#.#.###", [1, 1, 3])).toBe(1);
      });
      it("works with test data 2", () => {
        expect(getNumCombinations(".??..??...?##.", [1, 1, 3])).toBe(4);
      });
      it("works with test data 3", () => {
        expect(getNumCombinations("?#?#?#?#?#?#?#?", [1, 3, 1, 6])).toBe(1);
      });
      it("works with test data 4", () => {
        expect(getNumCombinations("????.#...#...", [4, 1, 1])).toBe(1);
      });
      it("works with test data 5", () => {
        expect(getNumCombinations("????.######..#####.", [1, 6, 5])).toBe(4);
      });
      it("works with test data 6 subset 2", () => {
        expect(getNumCombinations("?????", [2, 1])).toBe(3);
      });
      it("works with test data 6 subset", () => {
        expect(getNumCombinations("???????", [2, 1])).toBe(10);
      });
      it("works with test data 6 subset 1", () => {
        expect(getNumCombinations("??????", [2, 1])).toBe(6);
      });
      it("works with test data 6", () => {
        expect(getNumCombinations("?###????????", [3, 2, 1])).toBe(10);
      });
      it("last row in input works", () => {
        expect(getNumCombinations("#?.??#??.?", [2, 2])).toBe(2);
      });
    });
    describe("count", () => {
      it("works with #, 1", () => {
        expect(count("#", [1])).toBe(1);
      });
      it("no match with ###, 1", () => {
        expect(count("###", [1])).toBe(0);
      });
      it("three matches with ???, 1", () => {
        expect(count("???", [1])).toBe(3);
      });
      it("match with ????, 2,1", () => {
        expect(count("????", [2, 1])).toBe(1);
      });
      it("works with ###, 3", () => {
        expect(count("###", [3])).toBe(1);
      });
      it("works with ?, 1", () => {
        expect(count("?", [1])).toBe(1);
      });
      it("works with ?#, 1", () => {
        expect(count("?#", [1])).toBe(1);
      });
      it("works with #?, 1", () => {
        expect(count("#?", [1])).toBe(1);
      });
      it("works with ??, 1", () => {
        expect(count("??", [1])).toBe(2);
      });
      it("works with #.#, 1,1", () => {
        expect(count("#.#", [1, 1])).toBe(1);
      });
      it("works with test data 1", () => {
        expect(count("#.#.###", [1, 1, 3])).toBe(1);
      });
      it("works with test data 2", () => {
        expect(count(".??..??...?##.", [1, 1, 3])).toBe(4);
      });
      it("works with test data 3", () => {
        expect(count("?#?#?#?#?#?#?#?", [1, 3, 1, 6])).toBe(1);
      });
      it("works with test data 4", () => {
        expect(count("????.#...#...", [4, 1, 1])).toBe(1);
      });
      it("works with test data 5", () => {
        expect(count("????.######..#####.", [1, 6, 5])).toBe(4);
      });
      it("works with test data 6 subset 2", () => {
        expect(count("?????", [2, 1])).toBe(3);
      });
      it("works with test data 6 subset", () => {
        expect(count("???????", [2, 1])).toBe(10);
      });
      it("works with test data 6 subset 1", () => {
        expect(count("??????", [2, 1])).toBe(6);
      });
      it("works with test data 6", () => {
        expect(count("?###????????", [3, 2, 1])).toBe(10);
      });
      it("last row in input works", () => {
        expect(count("#?.??#??.?", [2, 2])).toBe(2);
      });
    });
  });
});

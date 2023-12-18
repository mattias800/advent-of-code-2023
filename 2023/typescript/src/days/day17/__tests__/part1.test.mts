import { getSolution, getSolutionForPosition } from "../part1.mjs";

describe("Day 17 Part 1", () => {
  const testdata =
    "2413432311323\n" +
    "3215453535623\n" +
    "3255245654254\n" +
    "3446585845452\n" +
    "4546657867536\n" +
    "1438598798454\n" +
    "4457876987766\n" +
    "3637877979653\n" +
    "4654967986887\n" +
    "4564679986453\n" +
    "1224686865563\n" +
    "2546548887735\n" +
    "4322674655533";

  describe("getSolution", () => {
    it("works with two rows test data", () => {
      const tworows = "2413432311323\n" + "3215453535623";
      expect(getSolutionForPosition(tworows, { column: 1, row: 0 })).toBe(4);
      // expect(getSolutionForPosition(tworows, { column: 5, row: 0 })).toBe(23);
    });
    // it("works with test data", () => {
    //   expect(getSolution(testdata)).toBe(102);
    // });
    // it("works with input", () => {
    //   expect(
    //     getSolution(fs.readFileSync("./src/days/day12/input.txt").toString()),
    //   ).toBe(7286);
    // });
  });
});

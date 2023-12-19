import { getSolution } from "../part2.mjs";

describe("Day 17 Part 2 ", () => {
  describe("getSolution", () => {
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
      it("works with test data", () => {
        expect(getSolution(testdata)).toBe(94);
      });
      it("works with second test data", () => {
        expect(
          getSolution(
            "111111111111\n" +
              "999999999991\n" +
              "999999999991\n" +
              "999999999991\n" +
              "999999999991",
          ),
        ).toBe(71);
      });
      // it("works with input", () => {
      //   expect(
      //     getSolution(fs.readFileSync("./src/days/day17/input.txt").toString()),
      //   ).toBe(881);
      // });
    });
  });
});

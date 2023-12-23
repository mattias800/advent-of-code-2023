import {getSolution} from "../part1.mjs";

describe("Day 20 Part 1", () => {
  describe("getSolution", () => {
    const testdata =
      "broadcaster -> a, b, c\n" +
      "%a -> b\n" +
      "%b -> c\n" +
      "%c -> inv\n" +
      "&inv -> a";

    it("works with test data", () => {
      expect(getSolution(testdata)).toBe(1);
    });
    // it("works with input", () => {
    //   expect(
    //     getSolution(fs.readFileSync("./src/days/day12/input.txt").toString()),
    //   ).toBe(7286);
    // });
  });
});

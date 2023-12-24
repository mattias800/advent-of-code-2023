import { getSolution } from "../part1.mjs";

describe("Day 20 Part 1", () => {
  describe("getSolution", () => {
    it("works with test data", () => {
      const testdata =
        "broadcaster -> a, b, c\n" +
        "%a -> b\n" +
        "%b -> c\n" +
        "%c -> inv\n" +
        "&inv -> a";

      expect(getSolution(testdata)).toBe(32000000);
    });

    it("works with second test data", () => {
      const testdata =
        "broadcaster -> a\n" +
        "%a -> inv, con\n" +
        "&inv -> b\n" +
        "%b -> con\n" +
        "&con -> output";
      expect(getSolution(testdata)).toBe(11687500);
    });
    // it("works with input", () => {
    //   expect(
    //     getSolution(fs.readFileSync("./src/days/day12/input.txt").toString()),
    //   ).toBe(7286);
    // });
  });
});

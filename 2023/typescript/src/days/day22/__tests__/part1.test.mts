import { getSolution } from "../part1.mjs";

describe("Day 19 Part 1", () => {
  describe("getSolution", () => {
    it("works with test data", () => {
      const testdata =
        "1,0,1~1,2,1\n" +
        "0,0,2~2,0,2\n" +
        "0,2,3~2,2,3\n" +
        "0,0,4~0,2,4\n" +
        "2,0,5~2,2,5\n" +
        "0,1,6~2,1,6\n" +
        "1,1,8~1,1,9";
      expect(getSolution(testdata)).toBe(5);
    });
    // it("works with input", () => {
    //   expect(
    //     getSolution(fs.readFileSync("./src/days/day12/input.txt").toString()),
    //   ).toBe(7286);
    // });
  });
});

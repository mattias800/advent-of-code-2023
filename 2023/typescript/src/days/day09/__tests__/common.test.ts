import { getDiffList, parseLine, predictNext } from "../common.mjs";

describe("Day 09", () => {
  describe("day09common", () => {
    describe("predictNext", () => {
      it("works", () => {
        const line =
          "20 38 72 140 277 545 1041 1903 3314 5504 8750 13374 19739 28243 39311 53385 70912 92330 118052 148448 183825";

        const nums = parseLine(line);
        expect(predictNext(nums)).toBe(224405);
      });
    });
    describe("getDiffList", () => {
      describe("with negative numbers", () => {
        it("works", () => {
          const line =
            "-8 -10 1 46 151 357 744 1469 2818 5272 9587 16888 28777 47455 75858 117807 178172 263050 379957 538034 748267";

          const nums = parseLine(line);
          const diff = getDiffList(nums);
          expect(diff).toEqual([
            -2, 11, 45, 105, 206, 387, 725, 1349, 2454, 4315, 7301, 11889,
            18678, 28403, 41949, 60365, 84878, 116907, 158077, 210233,
          ]);
          expect(diff.length).toBe(nums.length - 1);
        });
      });
      describe("line 15", () => {
        it("works", () => {
          const line =
            "20 38 72 140 277 545 1041 1903 3314 5504 8750 13374 19739 28243 39311 53385 70912 92330 118052 148448 183825";

          const nums = parseLine(line);
          const diff = getDiffList(nums);
          expect(diff).toEqual([
            18, 34, 68, 137, 268, 496, 862, 1411, 2190, 3246, 4624, 6365, 8504,
            11068, 14074, 17527, 21418, 25722, 30396, 35377,
          ]);
          expect(diff.length).toBe(nums.length - 1);
        });
      });
    });
  });
});

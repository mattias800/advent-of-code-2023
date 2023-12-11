import { getSolution } from "../part1.mjs";
import fs from "fs";
import {byHandPrecedence, byHandStrength} from "../common.mjs";

const strengthOrder = "x23456789TJQKA";

describe("part1", () => {
  describe("getSolution", () => {
    it("works with test data", () => {
      expect(
        getSolution(
          "32T3K 765\n" +
            "T55J5 684\n" +
            "KK677 28\n" +
            "KTJJT 220\n" +
            "QQQJA 483",
        ),
      ).toBe(6440);
    });
    it("works with input", () => {
      expect(getSolution(fs.readFileSync("./src/input.txt").toString())).toBe(
        249638405,
      );
    });
  });

  describe("byHandStrength", () => {
    const comparator = byHandStrength(strengthOrder);
    it("works once", () => {
      expect(["33332", "2AAAA"].sort(comparator)).toEqual(["33332", "2AAAA"]);
    });
    it("works twice", () => {
      expect(["77888", "77788"].sort(comparator)).toEqual(["77888", "77788"]);
    });
    it("works with two pairs", () => {
      expect(["KK677", "KTJJT"].sort(comparator)).toEqual(["KK677", "KTJJT"]);
    });
    it("works with second two pairs", () => {
      expect(["T55J5", "QQQJA"].sort(comparator)).toEqual(["QQQJA", "T55J5"]);
    });
  });

  describe("byHandPrecedence", () => {
    describe("when first character is different", () => {
      it("singles", () => {
        console.log(["3", "2", "4"].sort(byHandPrecedence(strengthOrder)));
        expect(["3", "2", "4"].sort(byHandPrecedence(strengthOrder))).toEqual([
          "4",
          "3",
          "2",
        ]);
      });
      it("works", () => {
        expect(
          ["23456", "56789", "34567", "45678"].sort(
            byHandPrecedence(strengthOrder),
          ),
        ).toEqual(["56789", "45678", "34567", "23456"]);
      });
    });
    describe("when first character is same", () => {
      it("works with previous example", () => {
        expect(
          ["33332", "2AAAA"].sort(byHandPrecedence(strengthOrder)),
        ).toEqual(["33332", "2AAAA"]);
      });
      it("sorts by second character", () => {
        expect(
          ["23456", "26789", "34567", "25678"].sort(
            byHandPrecedence(strengthOrder),
          ),
        ).toEqual(["34567", "26789", "25678", "23456"]);
      });
    });
    describe("when first and second character is same", () => {
      it("sorts by third character", () => {
        expect(
          ["22456", "22789", "34567", "22678"].sort(
            byHandPrecedence(strengthOrder),
          ),
        ).toEqual(["34567", "22789", "22678", "22456"]);
      });
    });
  });
});

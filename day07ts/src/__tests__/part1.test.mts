import { byHandPrecedence, byHandStrength, getSolution } from "../part1.mjs";

describe("part1", () => {
  describe("getSolution", () => {
    it("works", () => {
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
  });

  describe("byHandStrength", () => {
    it("singles", () => {
      expect(["3", "2", "4"].sort(byHandStrength)).toEqual(["4", "3", "2"]);
    });
    it("works", () => {
      expect(["33332", "2AAAA"].sort(byHandStrength)).toEqual([
        "33332",
        "2AAAA",
      ]);

      expect(["77888", "77788"].sort(byHandStrength)).toEqual([
        "77888",
        "77788",
      ]);
    });
    it("works with two pairs", () => {
      expect(["KK677", "KTJJT"].sort(byHandStrength)).toEqual([
        "KK677",
        "KTJJT",
      ]);
    });
    it("works with two pairs", () => {
      expect(["T55J5", "QQQJA"].sort(byHandStrength)).toEqual([
        "QQQJA",
        "T55J5",
      ]);
    });
  });

  describe("byHandPrecedence", () => {
    describe("when first character is different", () => {
      it("works", () => {
        expect(
          ["23456", "56789", "34567", "45678"].sort(byHandPrecedence),
        ).toEqual(["56789", "45678", "34567", "23456"]);
      });
    });
    describe("when first character is same", () => {
      it("sorts by second character", () => {
        expect(
          ["23456", "26789", "34567", "25678"].sort(byHandPrecedence),
        ).toEqual(["34567", "26789", "25678", "23456"]);
      });
    });
    describe("when first and second character is same", () => {
      it("sorts by third character", () => {
        expect(
          ["22456", "22789", "34567", "22678"].sort(byHandPrecedence),
        ).toEqual(["34567", "22789", "22678", "22456"]);
      });
    });
  });
});

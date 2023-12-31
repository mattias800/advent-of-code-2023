import {
  byHandPrecedence,
  byHandStrength,
  getFiveOfAKind,
  getFourOfAKind,
  getFullHouse,
  getMostCommonCard,
  getPair,
  getThreeOfAKind,
  getTwoPair,
} from "../common.mts";

const strengthOrder = "x23456789TJQKA";

describe("Day 07", () => {
  describe("common", () => {
    describe("getFiveOfAKind", () => {
      describe("when there are five of same", () => {
        it("returns value", () => {
          expect(getFiveOfAKind("22222", strengthOrder)).toBe(1);
          expect(getFiveOfAKind("33333", strengthOrder)).toBe(2);
          expect(getFiveOfAKind("AAAAA", strengthOrder)).toBe(13);
        });
      });
      describe("when there are NOT five of same", () => {
        it("returns 0", () => {
          expect(getFiveOfAKind("45678", strengthOrder)).toBe(0);
        });
      });
    });
    describe("getFourOfAKind", () => {
      describe("when there are five of same", () => {
        it("returns value", () => {
          expect(getFourOfAKind("22222", strengthOrder)).toBe(1);
          expect(getFourOfAKind("22221", strengthOrder)).toBe(1);
          expect(getFourOfAKind("33333", strengthOrder)).toBe(2);
          expect(getFourOfAKind("AAAAA", strengthOrder)).toBe(13);
          expect(getFourOfAKind("AAAAB", strengthOrder)).toBe(13);
        });
      });
      describe("when there are NOT five of same", () => {
        it("returns 0", () => {
          expect(getFourOfAKind("22211", strengthOrder)).toBe(0);
          expect(getFourOfAKind("AAABB", strengthOrder)).toBe(0);
          expect(getFourOfAKind("45678", strengthOrder)).toBe(0);
        });
      });
    });
    describe("getThreeOfAKind", () => {
      describe("when there are five of same", () => {
        it("returns value", () => {
          expect(getThreeOfAKind("22222", strengthOrder)).toBe(1);
          expect(getThreeOfAKind("22221", strengthOrder)).toBe(1);
          expect(getThreeOfAKind("22211", strengthOrder)).toBe(1);
          expect(getThreeOfAKind("33333", strengthOrder)).toBe(2);
          expect(getThreeOfAKind("AAAAA", strengthOrder)).toBe(13);
          expect(getThreeOfAKind("AAAAB", strengthOrder)).toBe(13);
          expect(getThreeOfAKind("AAABB", strengthOrder)).toBe(13);
        });
      });
      describe("when there are NOT five of same", () => {
        it("returns 0", () => {
          expect(getThreeOfAKind("22311", strengthOrder)).toBe(0);
          expect(getThreeOfAKind("AACBB", strengthOrder)).toBe(0);
          expect(getThreeOfAKind("45678", strengthOrder)).toBe(0);
        });
      });
    });
    describe("getTwoPair", () => {
      describe("when there are five of same", () => {
        it("returns value", () => {
          expect(getTwoPair("22233", strengthOrder)).toBe(3);
          expect(getTwoPair("AAAKK", strengthOrder)).toBe(25);
        });
      });
      describe("when there are NOT five of same", () => {
        it("returns 0", () => {
          expect(getTwoPair("22221", strengthOrder)).toBe(0);
          expect(getTwoPair("22222", strengthOrder)).toBe(0);
          expect(getTwoPair("45678", strengthOrder)).toBe(0);
          expect(getTwoPair("33333", strengthOrder)).toBe(0);
          expect(getTwoPair("AAAAA", strengthOrder)).toBe(0);
          expect(getTwoPair("AAAAB", strengthOrder)).toBe(0);
        });
      });
    });
    describe("getPair", () => {
      describe("when there are five of same", () => {
        it("returns value", () => {
          expect(getPair("22233", strengthOrder)).toBe(2);
          expect(getPair("AAAKK", strengthOrder)).toBe(13);
        });
      });
      describe("when there are NOT five of same", () => {
        it("returns 0", () => {
          expect(getPair("45678", strengthOrder)).toBe(0);
        });
      });
    });
    describe("getFullHouse", () => {
      describe("when there are five of same", () => {
        it("returns value", () => {
          expect(getFullHouse("22233", strengthOrder)).toBe(7);
          expect(getFullHouse("22333", strengthOrder)).toBe(8);
          expect(getFullHouse("AAAKK", strengthOrder)).toBe(63);
          expect(getFullHouse("AAAQQ", strengthOrder)).toBe(61);
          expect(getFullHouse("AAQQQ", strengthOrder)).toBe(59);
        });
      });
      describe("when there are NOT five of same", () => {
        it("returns 0", () => {
          expect(getFullHouse("45678", strengthOrder)).toBe(0);
          expect(getFullHouse("44255", strengthOrder)).toBe(0);
        });
      });
    });
    describe("getMostCommonCard", () => {
      describe("when it starts with joker", () => {
        it("returns not joker", () => {
          expect(getMostCommonCard("J2345")).toBe("2");
        });
      });
      describe("when joker is most common", () => {
        it("returns not joker", () => {
          expect(getMostCommonCard("JJJ22")).toBe("2");
        });
      });
      describe("when it is only jokers", () => {
        it("returns k", () => {
          expect(getMostCommonCard("JJJJJ")).toBe("K");
        });
      });
      describe("when there are five of same", () => {
        it("returns value", () => {
          expect(getMostCommonCard("22233")).toBe("2");
          expect(getMostCommonCard("22333")).toBe("3");
          expect(getMostCommonCard("AAAKK")).toBe("A");
          expect(getMostCommonCard("AAAQQ")).toBe("A");
          expect(getMostCommonCard("AAQQQ")).toBe("Q");
        });
      });
      describe("when there are NOT five of same", () => {
        it("returns 0", () => {
          expect(getMostCommonCard("45678")).toBe("4");
          expect(getMostCommonCard("44255")).toBe("4");
        });
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
          expect(["3", "2", "4"].sort(byHandPrecedence(strengthOrder))).toEqual(
            ["4", "3", "2"],
          );
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
});

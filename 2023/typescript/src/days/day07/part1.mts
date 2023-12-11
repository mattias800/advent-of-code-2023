import {
  byHandBidStrength,
  fromRowToHandBid,
  getHandStrength,
} from "./common.mjs";

const strengthOrder = "x23456789TJQKA";

export const part1 = (input: string) => {
  const solution = getSolution(input);

  console.log("Part 1 solution: " + solution);
};

export const getSolution = (input: string): number => {
  const lines = input.split("\n").filter((p) => p);

  const handBids = lines.map(fromRowToHandBid);
  handBids.sort(byHandBidStrength(strengthOrder));
  handBids.reverse();

  const withRank = handBids.map((h, i) => ({
    ...h,
    rank: i + 1,
    strength: getHandStrength(h.hand, strengthOrder),
  }));

  const values = withRank.map((w) => w.bid * w.rank);
  return values.reduce((sum, item) => sum + item, 0);
};

import {
  byHandBidStrength,
  fromRowToHandBid,
  getHandStrength,
  getMostCommonCard,
  HandBid,
} from "./common.mjs";

export const strengthOrder = "J23456789TQKA";

export const part2 = (input: string) => {
  const solution = getSolution(input);

  console.log("Part 2 solution: " + solution);
};

export const getSolution = (input: string): number => {
  const lines = input.split("\n").filter((p) => p);

  const handBids = lines.map(fromRowToHandBid).map<HandBid>((h) => ({
    hand: replaceJoker(h.hand),
    bid: h.bid,
  }));

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

const replaceJoker = (hand: string): string => {
  const mostCommonCard = getMostCommonCard(hand);
  return hand.replaceAll("J", mostCommonCard);
};

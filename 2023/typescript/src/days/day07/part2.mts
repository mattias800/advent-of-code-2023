import {
  byHandPrecedence,
  fromRowToHandBid,
  getHandStrength,
  getMostCommonCard,
  HandBid,
} from "./common.mts";

export const strengthOrder = "J23456789TQKA";

export const part2 = (input: string) => {
  const solution = getSolution(input);

  console.log("Part 2 solution: " + solution);
};

interface HandBidDecorated extends HandBid {
  handNoJokers: string;
}

export const getSolution = (input: string): number => {
  const lines = input.split("\n").filter((p) => p);

  const handBids = lines.map(fromRowToHandBid).map<HandBidDecorated>((h) => ({
    handNoJokers: replaceJoker(h.hand),
    hand: h.hand,
    bid: h.bid,
  }));

  handBids.sort(byHandBidStrength(strengthOrder));
  handBids.reverse();

  const withRank = handBids.map((h, i) => ({
    ...h,
    rank: i + 1,
    strength: getHandStrength(h.handNoJokers, strengthOrder),
  }));

  const values = withRank.map((w) => w.bid * w.rank);
  return values.reduce((sum, item) => sum + item, 0);
};

const replaceJoker = (hand: string): string => {
  const mostCommonCard = getMostCommonCard(hand);
  return hand.replaceAll("J", mostCommonCard);
};

export const byHandBidStrength =
  (strengthOrder: string) =>
  (a: HandBidDecorated, b: HandBidDecorated): number => {
    const r =
      getHandStrength(b.handNoJokers, strengthOrder).strength -
      getHandStrength(a.handNoJokers, strengthOrder).strength;
    if (r === 0) {
      return byHandPrecedence(strengthOrder)(a.hand, b.hand);
    }
    return r;
  };

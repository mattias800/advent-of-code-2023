const strengthOrder = "23456789TJQKA";

export const getFiveOfAKind = (hand: string): number => {
  for (let i = 1; i < hand.length; i++) {
    if (hand[0] !== hand[i]) {
      return 0;
    }
  }
  return strengthOrder.indexOf(hand[0]);
};

export const findNumOfAKind = (
  hand: string,
  num: number,
  excludeChar?: string,
): string | undefined => {
  for (let i = 0; i < hand.length; i++) {
    const current = hand[i];
    let counter = 0;
    if (excludeChar && current === excludeChar) {
      continue;
    }
    for (let j = 0; j < hand.length; j++) {
      if (current === hand[j]) {
        counter++;
        if (counter >= num) {
          return current;
        }
      }
    }
  }
  return undefined;
};

export const getFourOfAKind = (hand: string): number => {
  const f = findNumOfAKind(hand, 4);
  if (f == null) {
    return 0;
  }
  return strengthOrder.indexOf(f);
};

export const getThreeOfAKind = (hand: string): number => {
  const f = findNumOfAKind(hand, 3);
  if (f == null) {
    return 0;
  }
  return strengthOrder.indexOf(f);
};

export const getFullHouse = (hand: string): number => {
  const threes = findNumOfAKind(hand, 3);
  if (threes == null) {
    return 0;
  }
  const twos = findNumOfAKind(hand, 2, threes);
  if (twos == null) {
    return 0;
  }
  return strengthOrder.indexOf(threes) + strengthOrder.indexOf(twos);
};

export const getTwoPair = (hand: string): number => {
  const firstPair = findNumOfAKind(hand, 2);
  if (firstPair == null) {
    return 0;
  }
  const secondPair = findNumOfAKind(hand, 2, firstPair);
  if (secondPair !== null) {
    return 0;
  }
  return strengthOrder.indexOf(firstPair) + strengthOrder.indexOf(secondPair);
};

export const getPair = (hand: string): number => {
  const firstPair = findNumOfAKind(hand, 2);
  const secondPair = findNumOfAKind(hand, 2, firstPair);
  if (firstPair != null && secondPair != null) {
    return Math.max(
      strengthOrder.indexOf(firstPair),
      strengthOrder.indexOf(secondPair),
    );
  }
  if (firstPair != null) {
    return strengthOrder.indexOf(firstPair);
  }
  if (secondPair != null) {
    return strengthOrder.indexOf(secondPair);
  }
  return 0;
};

export const getHandStrength = (hand: string): number => {
  const fiveOfAKind = getFiveOfAKind(hand);
  if (fiveOfAKind) {
    return 700 + fiveOfAKind;
  }
  const fourOfAKind = getFourOfAKind(hand);
  if (fourOfAKind) {
    return 600 + fourOfAKind;
  }
  const fullHouse = getFullHouse(hand);
  if (fullHouse) {
    return 500 + fullHouse;
  }
  const threeOfAKind = getThreeOfAKind(hand);
  if (threeOfAKind) {
    return 400 + threeOfAKind;
  }
  const twoPair = getTwoPair(hand);
  if (twoPair) {
    return 200 + twoPair;
  }
  const pair = getPair(hand);
  if (pair) {
    return 100 + pair;
  }

  return 0;
};

export const byStrength = (a: string, b: string): number =>
  getHandStrength(b) - getHandStrength(a);

export const byStrengthFullRow = (a: string, b: string): number =>
  getHandStrength(b.split(" ")[0]) - getHandStrength(a.split(" ")[0]);

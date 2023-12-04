export const numbersStringToList = (s: string): Array<number> =>
  s
    .split(" ")
    .map((s) => s.trim())
    .map((s) => parseInt(s));

export const getWinningNumbersFromCard = (cardLine: string): Array<number> => {
  const [, nums] = cardLine.split(":");
  const [winningString, ownedString] = nums.trim().split("|");
  const winning = numbersStringToList(winningString);
  const owned = numbersStringToList(ownedString);
  return owned.filter((o) => winning.indexOf(o) >= 0);
};

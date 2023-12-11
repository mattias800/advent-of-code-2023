export const parseInput = (input: string): Array<Array<number>> =>
  input
    .split("\n")
    .filter((p) => p)
    .map((p) => p.trim())
    .map(parseLine);

export const parseLine = (line: string): Array<number> =>
  line.split(" ").map((p) => parseInt(p));

export const getDiffList = (nums: Array<number>): Array<number> => {
  const list: Array<number> = [];
  for (let i = 0; i < nums.length - 1; i++) {
    list.push(nums[i + 1] - nums[i]);
  }
  return list;
};

export const isOnlyZeroes = (nums: Array<number>): boolean => {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      return false;
    }
  }
  return true;
};

export const predictNext = (nums: Array<number>): number => {
  if (isOnlyZeroes(nums)) {
    return 0;
  }
  const diff = getDiffList(nums);
  const next = predictNext(diff);

  return nums[nums.length - 1] + next;
};

export const predictPrevious = (nums: Array<number>): number => {
  if (isOnlyZeroes(nums)) {
    return 0;
  }
  const diff = getDiffList(nums);
  const prev = predictPrevious(diff);

  return nums[0] - prev;
};

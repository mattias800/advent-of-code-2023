export type Board = Array<string>;

export const parseInput = (input: string): Board => {
  return input
    .split("\n")
    .filter((p) => p)
    .map((p) => p.trim());
};

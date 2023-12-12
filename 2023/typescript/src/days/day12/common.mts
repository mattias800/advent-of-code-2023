import { first, tail } from "lodash";

export type Operational = ".";
export type Damaged = "#";
export type Unknown = "?";

export interface Doc {
  pattern: string;
  groups: Array<number>;
}

export const parseInput = (input: string): Array<Doc> => {
  const lines = input
    .split("\n")
    .filter((p) => p)
    .map((p) => p.trim());
  return lines.map(parseLine);
};

export const parseLine = (line: string): Doc => {
  const [pattern, groupsString] = line.split(" ");
  const groups = groupsString.split(",").map((p) => parseInt(p));
  return {
    groups,
    pattern,
  };
};

export const getNumCombinations = (
  pattern: string,
  groups: Array<number>,
  depth: number = 0,
): number => {
  console.log("-------------");
  console.log("depth: " + depth);
  console.log("pattern: " + pattern);
  console.log("groups", groups);
  let numCombinations = 0;

  if (groups.length === 0) {
    if (pattern.indexOf("#") >= 0 || pattern.indexOf("?") >= 0) {
      return 0;
    } else {
      return 1;
    }
  }

  const group = groups[0];

  for (let i = 0; i < pattern.length; i++) {
    const subpattern = pattern.substring(i, i + group);

    if (canContainGroup(subpattern)) {
      const tailPattern = pattern.substring(subpattern.length);

      numCombinations += getNumCombinations(
        tailPattern,
        tail(groups),
        depth + 1,
      );
    }
  }

  return numCombinations;
};

const canContainGroup = (subpattern: string): boolean =>
  subpattern.indexOf(".") < 0;

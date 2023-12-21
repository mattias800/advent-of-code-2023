import { dl } from "../../common/log/Log.ts";

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

export const getNumCombinations = (pattern: string, groups: Array<number>) =>
  traverseCombinations(pattern, groups, false, 0);

/**
 * This is not my solution, it was taken from Youtube.
 * I used it to provide more expected values for unit test.
 * Also, it is a much cleaner solution...
 * @param pattern
 * @param groups
 */
export const count = (pattern: string, groups: Array<number>): number => {
  const cache = {};
  return countTraverse(pattern, groups, 0, 0, cache);
};
export const countTraverse = (
  fullPattern: string,
  groups: Array<number>,
  patternIndex: number,
  groupsIndex: number,
  cache: Record<number, Record<number, number>>,
): number => {
  if (patternIndex >= fullPattern.length) {
    if (groupsIndex >= groups.length) {
      return 1;
    } else {
      return 0;
    }
  }

  if (groupsIndex >= groups.length) {
    if (fullPattern.indexOf("#", patternIndex) >= 0) {
      return 0;
    } else {
      return 1;
    }
  }

  const cacheValue = cache[patternIndex]?.[groupsIndex];
  if (cacheValue != null) {
    return cacheValue;
  }

  let result = 0;

  const char = fullPattern.charAt(patternIndex);

  if (char === "." || char === "?") {
    result += countTraverse(
      fullPattern,
      groups,
      patternIndex + 1,
      groupsIndex,
      cache,
    );
  }
  if (char === "#" || char === "?") {
    const indexOfDot = fullPattern.indexOf(".", patternIndex);
    if (
      groups[groupsIndex] <= fullPattern.length - patternIndex &&
      (indexOfDot < 0 || indexOfDot >= patternIndex + groups[groupsIndex]) &&
      (groups[groupsIndex] === fullPattern.length - patternIndex ||
        fullPattern[patternIndex + groups[groupsIndex]] !== "#")
    ) {
      result += countTraverse(
        fullPattern,
        groups,
        patternIndex + groups[groupsIndex] + 1,
        groupsIndex + 1,
        cache,
      );
    }
  }

  cache[patternIndex] = cache[patternIndex] || {};
  cache[patternIndex][groupsIndex] = result;

  return result;
};

export const traverseCombinations = (
  pattern: string,
  groups: Array<number>,
  isInGroup: boolean,
  depth: number,
): number => {
  dl(depth, "-------------");
  dl(depth, 'pattern: "' + pattern + '"');
  dl(depth, "groups: " + groups.toString());
  dl(depth, "isInGroup: " + isInGroup);

  if (pattern === "") {
    if (groups.length === 0) {
      dl(depth, "found match! pattern is empty and there are no more groups.");
      return 1;
    } else {
      dl(depth, "no match! pattern is empty but there are still groups.");
      return 0;
    }
  }
  if (groups.length === 0) {
    dl(depth, "no groups left");
    if (pattern.indexOf("#") < 0) {
      dl(depth, "found match! no more groups and pattern contains no more #");
      return 1;
    } else {
      dl(depth, "no match, no more groups, but pattern contains more #");
      return 0;
    }
  }

  if (minPatternLengthForGroups(groups) > pattern.length) {
    dl(depth, "fail! pattern is not big enough for groups.");
    return 0;
  }

  const [group, ...groupRest] = groups;

  if (pattern.length < group) {
    dl(depth, "Not enough pattern left for group");
    // Not enough pattern left for group.
    return 0;
  }

  let numCombinations = 0;

  const char = pattern.charAt(0);
  const nextChar = pattern.charAt(1);
  const patternRest = pattern.substring(1);

  const patternRestWithDot =
    group === 1 && patternRest.charAt(0) === "?"
      ? "." + patternRest.substring(1)
      : patternRest;

  dl(depth, "char: " + char);
  if (char === "#") {
    if (group === 1 && nextChar === "#") {
      dl(
        depth,
        "match failed, because group needs only this #, but next is also #.",
      );
      return 0;
    }

    const nextGroups = group === 1 ? groupRest : [group - 1, ...groupRest];
    return traverseCombinations(
      patternRestWithDot,
      nextGroups,
      group > 1,
      depth + 1,
    );
  }
  if (char === "?") {
    const nextGroups = group === 1 ? groupRest : [group - 1, ...groupRest];

    if (group === 1 && nextChar === "#") {
      if (isInGroup) {
        dl(
          depth,
          "match failed! notUsingUnknown because group does not want next #, but we are in group.",
        );
        return 0;
      }
      dl(depth, "notUsingUnknown because group does not want next #");
      return traverseCombinations(patternRest, groups, false, depth + 1);
    }

    if (isInGroup) {
      dl(depth, "usingUnknown only, because we are in group");
      return traverseCombinations(
        patternRestWithDot,
        nextGroups,
        group > 1,
        depth + 1,
      );
    }

    dl(depth, "branch into using ?");
    const usingUnknown = traverseCombinations(
      patternRestWithDot,
      nextGroups,
      group > 1,
      depth + 1,
    );

    dl(depth, "branch into not using ?");
    const notUsingUnknown = traverseCombinations(
      patternRest,
      groups,
      false,
      depth + 1,
    );

    return usingUnknown + notUsingUnknown;
  }
  if (char === ".") {
    if (isInGroup) {
      // Group did not terminate correctly.
      dl(depth, "Group terminated by dot.");
      return 0;
    }
    return traverseCombinations(patternRest, groups, false, depth + 1);
  }
  dl(depth, "return numCombinations: " + numCombinations);
  return numCombinations;
};

export const minPatternLengthForGroups = (groups: Array<number>): number =>
  groups.reduce((sum, item) => sum + item, 0) + groups.length - 1;

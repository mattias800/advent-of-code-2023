import { range } from "lodash";

export const dl = (depth: number, s: string): void => {
  const indent = range(0, depth)
    .map(() => "   ")
    .join("");
  console.log(indent + s);
};

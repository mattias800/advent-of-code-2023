import {
  countNumDigs,
  digByCommands,
  digInside,
  digMapToString,
  parseInput,
} from "./common.mjs";

export const getSolution = (input: string): number => {
  const commands = parseInput(input);

  const digMap = digByCommands(commands);

  console.log(digMapToString(digMap));
  digInside(digMap);
  console.log("");
  console.log(digMapToString(digMap));
  return countNumDigs(digMap);
};

import { ModuleConfiguration, ModuleState, parseInput } from "./common.mjs";
import { createInitialModuleState, pressButton } from "./part1.mjs";

export const getSolution = (input: string): number => {
  const config = parseInput(input);
  const state = createInitialModuleState(config);
  return findLowest(state, config);
};

export const findLowest = (
  state: ModuleState,
  config: ModuleConfiguration,
): number => {
  for (let i = 0; i < 100000; i++) {
    pressButton(state, config);
    if (state.reachedLowRx) {
      return i;
    }
  }
  return -1;
};

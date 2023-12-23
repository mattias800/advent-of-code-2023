import {
  getAllInputConnectedToModule,
  ModuleConfiguration,
  parseInput,
  Signal,
} from "./common.mjs";

export const getSolution = (input: string): number => {
  const config = parseInput(input);
  pressButton(config);
  return 0;
};

interface FlipFlopState {
  on: boolean;
}

interface ConjunctionInputMemory {
  from: string;
  signalMemory: Signal;
}

interface ConjunctionState {
  inputMemory: Array<ConjunctionInputMemory>;
}

interface ModuleState {
  flipFlips: Record<string, FlipFlopState>;
  conjunctions: Record<string, ConjunctionState>;
  log: Array<PulseQueueItem>;
}

export const createInitialModuleState = (
  config: ModuleConfiguration,
): ModuleState => {
  return config.rows.reduce(
    (sum, item) => {
      if (item.input.type === "%") {
        sum.flipFlips[item.input.name] = {
          on: false,
        };
      }
      if (item.input.type === "&") {
        sum.conjunctions[item.input.name] = {
          inputMemory: getAllInputConnectedToModule(
            item.input.name,
            config,
          ).map((from) => ({ from, signalMemory: "low" })),
        };
      }
      return sum;
    },
    { conjunctions: {}, flipFlips: {}, log: [] } as ModuleState,
  );
};

export const pressButton = (config: ModuleConfiguration) => {
  const pulseQueue: PulseQueue = [
    {
      from: "button",
      signal: "low",
      output: "broadcaster",
    },
  ];
  const state: ModuleState = createInitialModuleState(config);

  while (pulseQueue.length) {
    console.log("--------");
    console.log(pulseQueue[0]);
    processPulseQueue(pulseQueue, state, config);
  }
};

export type PulseQueue = Array<PulseQueueItem>;

export interface PulseQueueItem {
  from: string;
  signal: Signal;
  output: string;
}

export const processPulseQueue = (
  queue: PulseQueue,
  state: ModuleState,
  config: ModuleConfiguration,
) => {
  const item = queue.shift();

  if (item == null) {
    return;
  }

  const nextConfig = config.rows.find((r) => r.input.name === item.output);
  const nextFrom = config.rows.find((r) => r.input.name == item.output)?.input;
  const nextOutputs = nextConfig?.outputs;

  if (nextOutputs == null || nextOutputs.length === 0) {
    throw new Error("Found no outputs.");
  }

  if (nextFrom == null) {
    throw new Error("Found no input.");
  }

  nextOutputs.forEach((output) => {
    const nextSignal = sendSignalToModule(
      item.signal,
      item.from,
      output,
      state,
      config,
    );
    if (nextSignal != null) {
      nextOutputs.forEach((nextOutput) => {
        queue.push({ from: output, signal: nextSignal, output: nextOutput });
      });
    }
  });
};

const sendSignalToModule = (
  signal: Signal,
  sourceModuleName: string,
  targetModuleName: string,
  state: ModuleState,
  config: ModuleConfiguration,
): Signal | undefined => {
  const targetModule = config.rows.find((r) => r.input.name == targetModuleName)
    ?.input;

  if (targetModule == null) {
    throw new Error("Sending to invalid module: " + targetModuleName);
  }

  if (targetModule.type === "&") {
    const targetModuleState = state.conjunctions[
      targetModule.name
    ].inputMemory.find((m) => m.from === sourceModuleName);

    if (targetModuleState == null) {
      throw new Error("& module is missing state for input.");
    }

    targetModuleState.signalMemory = signal;

    return allConjunctionInputsAreHigh(targetModule.name, state)
      ? "low"
      : "high";
  }

  if (targetModule.type === "%") {
    if (signal === "high") {
      return undefined;
    }

    const targetModuleState = state.flipFlips[targetModule.name];

    targetModuleState.on = !targetModuleState.on;

    return targetModuleState.on ? "high" : "low";
  }

  return signal;
};

const allConjunctionInputsAreHigh = (
  moduleName: string,
  state: ModuleState,
) => {
  const moduleState = state.conjunctions[moduleName];
  const anyIsLow = moduleState.inputMemory.some((m) => !m.signalMemory);
  return !anyIsLow;
};

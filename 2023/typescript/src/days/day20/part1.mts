import {
  ConfigRow,
  getAllInputConnectedToModule,
  ModuleConfiguration,
  ModuleInput,
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
    console.log(pulseQueue[0]);
    const item = pulseQueue.shift();

    if (item == null) {
      return;
    }

    sendSignalToModule(
      item.signal,
      item.from,
      item.output,
      state,
      config,
      pulseQueue,
    );
  }
};

export type PulseQueue = Array<PulseQueueItem>;

export interface PulseQueueItem {
  from: string;
  signal: Signal;
  output: string;
}

const sendSignalToModule = (
  signal: Signal,
  sourceModuleName: string,
  targetModuleName: string,
  state: ModuleState,
  config: ModuleConfiguration,
  queue: PulseQueue,
) => {
  const targetConfig = config.rows.find(
    (r) => r.input.name == targetModuleName,
  );

  if (targetConfig == null) {
    throw new Error("Cannot find config: " + targetModuleName);
  }

  const targetModule = targetConfig.input;

  if (targetModule.type === "&") {
    const nextSignal = writeToConjectureModuleAndGetNextSignal(
      signal,
      sourceModuleName,
      targetModule,
      state,
    );
    pushOutputsToQueue(nextSignal, targetConfig, queue);
  } else if (targetModule.type === "%") {
    const nextSignal = writeToFlipFlopModuleAndGetNextSignal(
      signal,
      targetModule,
      state,
    );
    if (nextSignal != null) {
      pushOutputsToQueue(nextSignal, targetConfig, queue);
    }
  } else {
    pushOutputsToQueue(signal, targetConfig, queue);
  }
};

export const pushOutputsToQueue = (
  signal: Signal,
  targetConfig: ConfigRow,
  queue: PulseQueue,
) => {
  targetConfig.outputs.forEach((output) => {
    queue.push({ from: targetConfig.input.name, signal, output });
  });
};

export const writeToFlipFlopModuleAndGetNextSignal = (
  signal: Signal,
  targetModule: ModuleInput,
  state: ModuleState,
) => {
  if (signal === "high") {
    return undefined;
  }

  const targetModuleState = state.flipFlips[targetModule.name];

  targetModuleState.on = !targetModuleState.on;

  return targetModuleState.on ? "high" : "low";
};

export const writeToConjectureModuleAndGetNextSignal = (
  signal: Signal,
  sourceModuleName: string,
  targetModule: ModuleInput,
  state: ModuleState,
) => {
  const conjunctionState = state.conjunctions[targetModule.name];

  if (conjunctionState == null) {
    throw new Error("& module is missing state: " + targetModule.name);
  }

  const targetModuleState = conjunctionState.inputMemory.find(
    (m) => m.from === sourceModuleName,
  );

  if (targetModuleState == null) {
    throw new Error(
      "& module " +
        targetModule.name +
        " is missing state for input: " +
        sourceModuleName,
    );
  }

  targetModuleState.signalMemory = signal;

  return allConjunctionInputsAreHigh(targetModule.name, state) ? "low" : "high";
};

const allConjunctionInputsAreHigh = (
  moduleName: string,
  state: ModuleState,
) => {
  const moduleState = state.conjunctions[moduleName];
  const anyIsLow = moduleState.inputMemory.some((m) => !m.signalMemory);
  return !anyIsLow;
};

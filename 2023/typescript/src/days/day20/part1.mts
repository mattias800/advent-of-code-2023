import {
  getAllInputConnectedToModule,
  ModuleConfiguration,
  ModuleInput,
  parseInput,
} from "./common.mjs";

export const getSolution = (input: string): number => {
  const config = parseInput(input);
  console.log(config);
  return 0;
};

interface FlipFlopState {
  on: boolean;
}

interface ConjunctionInputMemory {
  from: string;
  memHigh: boolean;
}

interface ConjunctionState {
  inputMemory: Array<ConjunctionInputMemory>;
}

interface ModuleState {
  flipFlips: Record<string, FlipFlopState>;
  conjunctions: Record<string, ConjunctionState>;
}

export const createInitialModuleState = (
  config: ModuleConfiguration,
): ModuleState => {
  return config.rows.reduce<ModuleState>(
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
          ).map((from) => ({ from, memHigh: false })),
        };
      }
      return sum;
    },
    { conjunctions: {}, flipFlips: {} },
  );
};

export const pressButton = (config: ModuleConfiguration) => {
  const pulseQueue: PulseQueue = [
    {
      from: { name: "button", type: "broadcast" },
      high: false,
      output: "broadcaster",
    },
  ];
  const state: ModuleState = createInitialModuleState(config);

  while (pulseQueue.length) {
    processPulseQueue(pulseQueue, state, config);
  }
};

export type PulseQueue = Array<PulseQueueItem>;

export interface PulseQueueItem {
  from: ModuleInput;
  high: boolean;
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

  if (item.from.type === "broadcast") {
    const nextHigh = item.high;
    nextOutputs.forEach((nextOutput) => {
      queue.push({ from: nextFrom, high: nextHigh, output: nextOutput });
    });
  }

  if (item.from.type === "%") {
    let nextHigh = item.high;
    const moduleState = state.flipFlips[item.from.name];
    if (!item.high) {
      moduleState.on = !moduleState.on;
      nextHigh = moduleState.on;
    }
    nextOutputs.forEach((nextOutput) => {
      queue.push({ from: nextFrom, high: nextHigh, output: nextOutput });
    });
  }

  if (item.from.type === "&") {
    let nextHigh = item.high;
    const moduleState = state.conjunctions[item.from.name];
    if (!item.high) {
      moduleState.on = !moduleState.on;
      nextHigh = moduleState.on;
    }
    nextOutputs.forEach((nextOutput) => {
      queue.push({ from: nextFrom, high: nextHigh, output: nextOutput });
    });
  }
};

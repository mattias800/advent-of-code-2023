export interface ModuleConfiguration {
  rows: Array<ConfigRow>;
}

export type ModuleType = "&" | "%" | "broadcast";
export type Signal = "low" | "high";

export interface ModuleInput {
  name: string;
  type: ModuleType;
}
export interface ConfigRow {
  input: ModuleInput;
  outputs: Array<string>;
}

export const parseInput = (input: string): ModuleConfiguration => {
  const rows = input
    .trim()
    .split("\n")
    .filter((p) => p)
    .map((p) => p.trim())
    .map(parseInputRow);

  return {
    rows,
  };
};

export const parseInputRow = (input: string): ConfigRow => {
  const [i, o] = input.split("->").map((p) => p.trim());
  const outputs = o.split(",").map((p) => p.trim());

  return {
    input: parseModuleInput(i),
    outputs,
  };
};

export const parseModuleInput = (input: string): ModuleInput => {
  if (input.startsWith("%")) {
    return {
      name: input.substring(1),
      type: "%",
    };
  }
  if (input.startsWith("&")) {
    return {
      name: input.substring(1),
      type: "&",
    };
  }
  return {
    name: input,
    type: "broadcast",
  };
};

export const getAllInputConnectedToModule = (
  moduleName: string,
  config: ModuleConfiguration,
): Array<string> =>
  config.rows
    .filter((row) => row.outputs.includes(moduleName))
    .map((row) => row.input.name);

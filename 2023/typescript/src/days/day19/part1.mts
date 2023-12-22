import {
  getMachinePartRating,
  MachinePart,
  parseInput,
  Workflow,
} from "./common.mjs";

export const getSolution = (input: string): number => {
  const system = parseInput(input);

  return system.machineParts
    .map((machinePart) => ({
      result: processMachinePart(machinePart, system.workflows),
      rating: getMachinePartRating(machinePart),
    }))
    .filter((p) => p.result === "A")
    .reduce((sum, item) => sum + item.rating, 0);
};

export const processMachinePart = (
  machinePart: MachinePart,
  workflows: Array<Workflow>,
) => {
  let currentRuleName = "in";
  for (let i = 0; i < 100; i++) {
    const workflow = workflows.find((w) => w.name === currentRuleName);
    if (workflow == null) {
      throw new Error("Could not find next workflow: " + currentRuleName);
    }
    const next = workflowMachinePart(machinePart, workflow);
    if (next === "A") {
      return "A";
    }
    if (next === "R") {
      return "R";
    }
    currentRuleName = next;
  }
  throw new Error("Did not reach end in 100 passes.");
};

export const workflowMachinePart = (
  machinePart: MachinePart,
  workflow: Workflow,
): string => {
  for (let i = 0; i < workflow.rules.length; i++) {
    const rule = workflow.rules[i];
    if ("operator" in rule) {
      const v = machinePart[rule.field];
      if (rule.operator === ">" && v > rule.value) {
        return rule.then;
      }
      if (rule.operator === "<" && v < rule.value) {
        return rule.then;
      }
    } else {
      return rule.next;
    }
  }
  throw new Error("Reached end of workflow without next.");
};

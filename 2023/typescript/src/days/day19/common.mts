interface System {
  workflows: Array<Workflow>;
  machineParts: Array<MachinePart>;
}

interface MachinePart {
  x: number;
  m: number;
  a: number;
  s: number;
}

interface Workflow {
  name: string;
  rules: Array<Rule>;
}

type Rule = RuleWithOperator | RuleWithNoOperator;

interface RuleWithOperator {
  field: keyof MachinePart;
  operator: string;
  value: number;
  nextRule: string;
}

interface RuleWithNoOperator {
  nextRule: string;
}

export const parseInput = (input: string): System => {
  const [w, m] = input
    .trim()
    .split("\n\n")
    .map((p) => p.trim());

  return {
    workflows: w.split("\n").map(parseWorkflow),
    machineParts: m.split("\n").map(parseMachineParts),
  };
};

export const parseWorkflow = (input: string): Workflow => {
  const [name, rest] = input.split("{");
  const [rulesString] = rest.split("}");
  const r = rulesString.split(",");

  return {
    name,
    rules: r.map(parseRule),
  };
};

export const parseRule = (input: string): Rule => {
  if (!input.includes(":")) {
    return {
      nextRule: input.trim(),
    };
  }

  const [check, nextRule] = input.split(":");

  if (check.includes(">")) {
    const [field, value] = check.split(">");
    return {
      field: field as keyof MachinePart,
      nextRule,
      value: parseInt(value),
      operator: ">",
    };
  }
  if (check.includes("<")) {
    const [field, value] = check.split("<");
    return {
      field: field as keyof MachinePart,
      nextRule,
      value: parseInt(value),
      operator: "<",
    };
  }

  throw new Error("Illegal rule format: " + input);
};

export const parseMachineParts = (input: string): MachinePart => {
  const [xf, mf, af, sf] = input
    .substring(1, input.length - 1)
    .split("\n")
    .flatMap((s) => s.split(","));

  const [, xv] = xf.split("=");
  const [, mv] = mf.split("=");
  const [, av] = af.split("=");
  const [, sv] = sf.split("=");

  return {
    x: parseInt(xv),
    m: parseInt(mv),
    a: parseInt(av),
    s: parseInt(sv),
  };
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
        return rule.nextRule;
      }
      if (rule.operator === "<" && v < rule.value) {
        return rule.nextRule;
      }
    } else {
      return rule.nextRule;
    }
  }
  throw new Error("Reached end of workflow without next.");
};

export const getMachinePartRating = (m: MachinePart): number =>
  m.x + m.m + m.a + m.s;

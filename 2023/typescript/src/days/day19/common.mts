export interface System {
  workflows: Array<Workflow>;
  machineParts: Array<MachinePart>;
}

export interface MachinePart {
  x: number;
  m: number;
  a: number;
  s: number;
}

export interface Workflow {
  name: string;
  rules: Array<Rule>;
}

export type Rule = RuleWithOperator | RuleWithNoOperator;

export interface RuleWithOperator {
  field: keyof MachinePart;
  operator: string;
  value: number;
  then: string;
}

export interface RuleWithNoOperator {
  next: string;
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
      next: input.trim(),
    };
  }

  const [check, nextRule] = input.split(":");

  if (check.includes(">")) {
    const [field, value] = check.split(">");
    return {
      field: field as keyof MachinePart,
      then: nextRule,
      value: parseInt(value),
      operator: ">",
    };
  }
  if (check.includes("<")) {
    const [field, value] = check.split("<");
    return {
      field: field as keyof MachinePart,
      then: nextRule,
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

export const getMachinePartRating = (m: MachinePart): number =>
  m.x + m.m + m.a + m.s;

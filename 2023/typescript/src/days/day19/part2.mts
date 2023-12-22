import { MachinePart, parseInput, Workflow } from "./common.mjs";
import { dl } from "../../common/log/Log.ts";

export const getSolution = (input: string): number => {
  const system = parseInput(input);
  const possible = createPossibleInit();

  console.log("countPossible(possible)", countPossible(possible));
  const acceptedRoutes: Array<Route> = [];
  getAllAcceptingRoutes("in", 0, [], acceptedRoutes, system.workflows, 0);

  // Get a list of all routes leading to R
  // Go over each route and turn off possible fields.

  markAccepted(possible, acceptedRoutes);

  return countPossible(possible);
};

const markAccepted = (possible: Possible, rejectedRoutes: Array<Route>) => {
  rejectedRoutes.forEach((route) => {
    route.forEach((routeItem) => {
      if (routeItem.field === "m") {
        console.log(
          "Mark as rejected",
          routeItem.field,
          routeItem.operator,
          routeItem.value,
        );
        console.log(route);
      }
      markFieldAsAccepted(
        possible,
        routeItem.field,
        routeItem.operator,
        routeItem.value,
      );
    });
  });
};

const markFieldAsAccepted = (
  possible: Possible,
  field: keyof Possible,
  operator: string,
  val: number,
) => {
  if (operator === ">") {
    for (let i = val + 1; i <= 4000; i++) {
      possible[field][i] = true;
    }
  }
  if (operator === "<") {
    for (let i = 1; i < val; i++) {
      possible[field][i] = true;
    }
  }
};

const countPossible = (possible: Possible): number => {
  console.log(
    'countPossibleField(possible, "x")',
    countPossibleField(possible, "x"),
  );
  console.log(
    'countPossibleField(possible, "m")',
    countPossibleField(possible, "m"),
  );
  console.log(
    'countPossibleField(possible, "a")',
    countPossibleField(possible, "a"),
  );
  console.log(
    'countPossibleField(possible, "s")',
    countPossibleField(possible, "s"),
  );
  return (
    countPossibleField(possible, "x") *
    countPossibleField(possible, "m") *
    countPossibleField(possible, "a") *
    countPossibleField(possible, "s")
  );
};

const countPossibleField = (
  possible: Possible,
  field: keyof Possible,
): number => {
  let result = 0;
  for (let i = 1; i <= 4000; i++) {
    if (possible[field][i]) {
      result++;
    }
  }
  return result;
};

interface Possible {
  x: Array<boolean>;
  m: Array<boolean>;
  a: Array<boolean>;
  s: Array<boolean>;
}

const createPossibleInit = (): Possible => {
  const possible: Possible = {
    x: [],
    m: [],
    a: [],
    s: [],
  };

  for (let i = 1; i <= 4000; i++) {
    possible.x[i] = false;
    possible.m[i] = false;
    possible.a[i] = false;
    possible.s[i] = false;
  }

  return possible;
};

interface RouteItem {
  field: keyof MachinePart;
  operator: string;
  value: number;
}

type Route = Array<RouteItem>;

//       px{a<2006:qkq,m>2090:A,rfg}
//       in{x>2662:A,R}
export const getAllAcceptingRoutes = (
  currentWorkflowName: string,
  currentRuleIndex: number,
  currentRuleRoute: Route,
  completeAcceptedRoutes: Array<Route>,
  workflows: Array<Workflow>,
  depth: number,
): void => {
  const log = (s: string) => dl(depth, s);

  log("-------- getAllRejectingRoutes: " + currentWorkflowName);
  log("route: " + JSON.stringify(currentRuleRoute));

  if (currentWorkflowName === "A") {
    log("Arrived at A");
    completeAcceptedRoutes.push(currentRuleRoute);
    return;
  }

  if (currentWorkflowName === "R") {
    log("Arrived at B");
    return;
  }

  const workflow = workflows.find((w) => w.name === currentWorkflowName);

  if (workflow == null) {
    throw new Error("Could not find workflow: " + currentWorkflowName);
  }

  const rule = workflow.rules[currentRuleIndex];
  log("rule: " + JSON.stringify(rule));

  if ("operator" in rule) {
    // Branch according to rule
    const nextRoute: Route = [
      ...currentRuleRoute,
      { field: rule.field, value: rule.value, operator: rule.operator },
    ];

    log("Branching 1: " + rule.then);
    getAllAcceptingRoutes(
      rule.then,
      0,
      nextRoute,
      completeAcceptedRoutes,
      workflows,
      depth + 1,
    );

    // Do not branch, run next rule.
    log("Branching 2: " + currentWorkflowName);
    getAllAcceptingRoutes(
      currentWorkflowName,
      currentRuleIndex + 1,
      nextRoute,
      completeAcceptedRoutes,
      workflows,
      depth + 1,
    );
  } else {
    log("No operator");
    if (rule.next === "A") {
      log("Found A");
      completeAcceptedRoutes.push(currentRuleRoute);
      return;
    } else if (rule.next === "R") {
      log("Found R");
      return;
    } else {
      return getAllAcceptingRoutes(
        rule.next,
        0,
        currentRuleRoute,
        completeAcceptedRoutes,
        workflows,
        depth + 1,
      );
    }
  }
};

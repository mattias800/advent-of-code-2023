export const exhaustSwitchCaseElseThrow = (arg: never) => {
  throw new Error(`Switch unhandled case: ${arg}`);
};

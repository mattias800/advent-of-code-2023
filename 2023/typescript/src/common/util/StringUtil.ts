export const replaceInString = (
  s: string,
  index: number,
  replacement: string,
) =>
  s.substring(0, index) + replacement + s.substring(index + replacement.length);

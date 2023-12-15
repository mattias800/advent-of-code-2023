export const getAsciiHash = (s: string): number => {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const ascii = s.charCodeAt(i);
    result += ascii;
    result *= 17;
    result = result % 256;
  }
  return result;
};

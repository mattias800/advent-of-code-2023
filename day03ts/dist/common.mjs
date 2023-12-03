export const numbers = "0123456789";
export const getNumbersInLine = (line) => {
    const list = [];
    let currentNumber = undefined;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (numbers.indexOf(char) >= 0) {
            if (currentNumber == null) {
                currentNumber = {
                    start: i,
                    value: char,
                };
            }
            else {
                currentNumber.value += char;
            }
        }
        else {
            if (currentNumber != null) {
                list.push(currentNumber);
                currentNumber = undefined;
            }
        }
    }
    if (currentNumber != null) {
        list.push(currentNumber);
    }
    return list;
};
export const getNeighbours = (numberInLine, lineNumber) => {
    const list = [];
    list.push({ column: numberInLine.start - 1, line: lineNumber });
    list.push({
        column: numberInLine.start + numberInLine.value.length,
        line: lineNumber,
    });
    for (let column = numberInLine.start - 1; column < numberInLine.start + numberInLine.value.length + 1; column++) {
        list.push({ column, line: lineNumber - 1 });
        list.push({ column, line: lineNumber + 1 });
    }
    return list;
};

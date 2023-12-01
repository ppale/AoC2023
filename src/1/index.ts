import fs from 'fs';
const txt = require.resolve('./input.txt');

var input = fs.readFileSync(txt, 'utf8').toString().split('\n');

const re = /(\d)/g;

const pt1LineParse = (line: string): number => {
  const digits = line.match(re)
  if (!digits) return 0;
  if (digits.length == 1) return parseInt(`${digits[0]}${digits[0]}`, 10);
  return parseInt(`${digits[0]}${digits[digits.length-1]}`, 10);
}

const numMap: { [key: string]: string } = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
};
const numKeys = Object.keys(numMap);
const numValues = Object.values(numMap);

const pt2LineParse = (line: string): number => {
  const splitLine = line.split('');
  
  // find first 
  var first: string = '0';
  splitLine.some((value, index) => {
    if (numValues.includes(value)) {
      first = value;
      return true;
    }
    
    const currentLine = line.substring(index);
    const hasStringNumber = numKeys.some((value) => {
      if (currentLine.startsWith(value)) {
        first = numMap[value];
        return true;
      }
    });

    return hasStringNumber;
  });

  // find last
  var last: string = first;
  splitLine.reverse().some((value, index) => {
    if (numValues.includes(value)) {
      last = value;
      return true;
    }

    const lineIndex = line.length - index - 1;
    const currentLine = line.substring(lineIndex);
    const hasStringNumber = numKeys.some((numKey) => {
      if (currentLine.startsWith(numKey)) {
        last = numMap[numKey];
        return true;
      }
    });

    return hasStringNumber;
  });

  return parseInt(`${first}${last}`, 10);
};

export const day1 = () => {
  const sums = input.reduce((prev, curr) => {
    return [
      prev[0] + pt1LineParse(curr),
      prev[1] + pt2LineParse(curr),
    ];
  }, [0, 0]);

  console.log('day 1');
  console.log(`part 1 sum: ${sums[0]}`); // expect 54953
  console.log(`part 2 sum: ${sums[1]}`); // expect 53868
}
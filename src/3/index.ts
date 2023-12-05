import fs from 'fs';
const txt = require.resolve('./input.txt');

var input = fs.readFileSync(txt, 'utf8').toString().split('\n');

interface NumberLocation {
  number: string;
  xStart: number;
  yStart: number;
};

const parseNumberLocations = (schematic: string[]): NumberLocation[] => {
  const re = /\d+/g;
  return schematic.reduce((prev: NumberLocation[], curr, idx) => {
    const matches = curr.matchAll(re);
    for (const match of matches) {
      const numLocation: NumberLocation = {
        number: match[0],
        xStart: match.index!,
        yStart: idx
      };
      prev = [...prev, numLocation];
    }
    return prev;
  }, []);
};

const isNumberLocationPartNumber = (numLocation: NumberLocation, schematic: string[]): boolean => {
  const xMax = schematic[0].length;
  const yMax = schematic.length - 1;
  const [xStart, yStart] = [Math.max(numLocation.xStart-1, 0), Math.max(numLocation.yStart-1, 0)];
  const [xEnd, yEnd] = [Math.min(numLocation.xStart+numLocation.number.length+1, xMax), Math.min(numLocation.yStart+1, yMax)];
  const charsToTest = schematic[yStart].substring(xStart, xEnd)
    + schematic[yEnd-1].substring(xStart, xEnd)
    + schematic[yEnd].substring(xStart, xEnd);

  const re = /[^\.\d]/g;
  return re.test(charsToTest);
};

const sumPartNumbers = (schematic: string[]): number => {
  const numLocs = parseNumberLocations(schematic);
  return numLocs.reduce((prev, curr) => {
    if (!isNumberLocationPartNumber(curr, schematic)) return prev;
    return prev + parseInt(curr.number, 10);
  }, 0);
}

const testInput = [
  '467..114..',
  '...*......',
  '..35..633.',
  '......#...',
  '617*......',
  '.....+.58.',
  '..592.....',
  '......755.',
  '...$.*....',
  '.664.598..'
];

export const day3 = () => {
  console.log('day 3');
  console.log(`part 1 sum: ${sumPartNumbers(input)}`);
}

day3();
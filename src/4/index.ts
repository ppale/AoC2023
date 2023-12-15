import fs from 'fs';
const txt = require.resolve('./input.txt');

var input = fs.readFileSync(txt, 'utf8').toString().split('\n');

interface Card {
  winners: string[];
  scratched: string[];
}

const parseLine = (line: string): Card => {
  const re = /^(Card\s+\d+:\s+)(?<winners>(\d+\s+)+)\|\s+(?<scratched>(\d+\s*)+)$/;
  const digitRe = /\d+/g;
  const match = line.match(re);
  if (match?.groups) {
    const winners = [...match.groups['winners'].matchAll(digitRe)].map(val => val[0]);
    const scratched = [...match.groups['scratched'].matchAll(digitRe)].map(val => val[0]);
    return {
      winners,
      scratched
    };
  }
  return {
    winners: [],
    scratched: []
  };
}

const getPoints = (input: string[]): number => {
  const scores = input.map(line => {
    const card = parseLine(line);
    const scratchedSet = new Set(card.scratched);
    const matches = card.winners.filter(x => scratchedSet.has(x));
    return matches.length ? 2**(matches.length-1) : 0;
  });

  return scores.reduce((prev, curr) => prev + curr, 0);
}

const testInput = [
  'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
  'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
  'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
  'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
  'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
  'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'
];

export const day4 = () => {
  console.log('day 4');
  console.log(`part 1 score: ${getPoints(input)}`); // should be 23750
}

day4();
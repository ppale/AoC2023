import fs from 'fs';
const txt = require.resolve('./input.txt');

var input = fs.readFileSync(txt, 'utf8').toString().split('\n');

type Color = 'red' | 'green' | 'blue';
interface Cube {
  quantity: number;
  color: Color;
};
interface Game {
  id: number;
  turns: Cube[][];
};

const parseInput = (input: string[]): Game[] => {
  return input.map(line => {
    const parts = line.split(':');
    const id = parseInt(parts[0].split(' ')[1], 10);
    const rawTurns = parts[1].split(';');
    const turns = rawTurns.map(turn => {
      const rawCubes = turn.split(',');
      return rawCubes.map(cube => {
        const parts = cube.trim().split(' ');
        return {
          quantity: parseInt(parts[0], 10),
          color: parts[1] as Color
        };
      });
    });
    return {
      id,
      turns,
    };
  });
};

interface ValidationInput {
  red: number;
  green: number;
  blue: number;
}

const validateGame = (numCubes: ValidationInput, game: Game): boolean => {
  const maxCubes = numCubes.red + numCubes.green + numCubes.blue;
  const validations = game.turns.map(turn => {
    const totalCubes = turn.reduce((prev, curr) => {
      return prev + curr.quantity
    }, 0);
    if (totalCubes > maxCubes) return false;
    return turn.map(cube => {
      return cube.quantity <= numCubes[cube.color];
    }).every(x => x);
  });
  return validations.every(x => x);
}

const getPossibleGames = (numCubes: ValidationInput, games: Game[]): number => {
  return games.reduce((prev, curr) => {
    if (validateGame(numCubes, curr)) return prev + curr.id;
    else return prev;
  }, 0);
}

const testInput = [
  'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
  'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
  'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
  'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
  'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
];

export const day2 = () => {
  console.log('day 2');
  const validationInput: ValidationInput = {red: 12, green: 13, blue: 14};
  console.log(`part 1 sum: ${getPossibleGames(validationInput, parseInput(input))}`);
}

day2();
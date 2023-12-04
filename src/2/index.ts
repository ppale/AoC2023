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

interface ColorCount {
  red: number;
  green: number;
  blue: number;
}

const validateGame = (numCubes: ColorCount, game: Game): boolean => {
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

const getPossibleGames = (numCubes: ColorCount, games: Game[]): number => {
  return games.reduce((prev, curr) => {
    if (validateGame(numCubes, curr)) return prev + curr.id;
    else return prev;
  }, 0);
}

const getMinCubesForGame = (game: Game): number => {
  const flatCubes = game.turns.flat();
  const red = flatCubes.filter(cube => cube.color == 'red').map(cube => cube.quantity);
  const green = flatCubes.filter(cube => cube.color == 'green').map(cube => cube.quantity);
  const blue = flatCubes.filter(cube => cube.color == 'blue').map(cube => cube.quantity);
  return Math.max(...red) * Math.max(...green) * Math.max(...blue);
}

const getMinCubeSum = (games: Game[]): number => {
  return games.map(game => getMinCubesForGame(game)).reduce((prev, curr) => prev + curr, 0);
}

export const day2 = () => {
  console.log('day 2');
  const games = parseInput(input);
  const colorCount: ColorCount = {red: 12, green: 13, blue: 14};
  console.log(`part 1 sum: ${getPossibleGames(colorCount, games)}`);
  console.log(`part 2 sum: ${getMinCubeSum(games)}`);
}

day2();
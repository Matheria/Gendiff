import path, { dirname } from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['file1.json', 'file2.json', 'expectedStylish.txt', 'stylish'],
  ['file1.yml', 'file2.yml', 'expectedStylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'expectedPlain.txt', 'plain'],
  ['file1.yml', 'file2.yml', 'expectedPlain.txt', 'plain'],
  ['file1.json', 'file2.json', 'expectedJson.txt', 'json'],
  ['file1.yml', 'file2.yml', 'expectedJson.txt', 'json'],
];

test.each(cases)('Compare %s and %s to expect %s in "%s" style', (firstArg, secondArg, expectedResult, format) => {
  const filepath1 = getFixturePath(firstArg);
  const filepath2 = getFixturePath(secondArg);
  const getResult = readFile(expectedResult);
  const result = genDiff(filepath1, filepath2, format);
  expect(result).toEqual(getResult);
});

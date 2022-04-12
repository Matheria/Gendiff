import path, { dirname } from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Two json-files comparsion', () => {
  const expectedResult = readFixture('expected_file.txt');
  const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(result).toEqual(expectedResult);
});

test('Two yml-files comparsion', () => {
  const expectedResult = readFixture('expected_file.txt');
  const result = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml');
  expect(result).toEqual(expectedResult);
});

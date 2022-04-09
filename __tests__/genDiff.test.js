import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';

import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Flat json-files comparison', () => {
  const expectedResult = readFixture('expected_res.txt');
  const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(result).toEqual(expectedResult);
});

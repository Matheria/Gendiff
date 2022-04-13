import path, { dirname } from 'path';
import fs from 'fs';
import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Stylish test', () => {
  test('Two json-files stylish comparsion', () => {
    const expectedResult = readFixture('expectedStylish.txt');
    const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
    expect(result).toEqual(expectedResult);
  });
  test('Two yml-files stylish comparsion', () => {
    const expectedResult = readFixture('expectedStylish.txt');
    const result = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml');
    expect(result).toEqual(expectedResult);
  });
});

describe('Plain test', () => {
  test('Two json-files plain comparsion', () => {
    const expectedResult = readFixture('expectedPlain.txt');
    const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain');
    expect(result).toEqual(expectedResult);
  });
  test('Two yml-files plain comparsion', () => {
    const expectedResult = readFixture('expectedPlain.txt');
    const result = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain');
    expect(result).toEqual(expectedResult);
  });
});

describe('Json test', () => {
  test('Two json-files json comparsion', () => {
    const expectedResult = readFixture('expectedJson.txt');
    const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json');
    expect(result).toEqual(expectedResult);
  });
  test('Two yml-files json comparsion', () => {
    const expectedResult = readFixture('expectedJson.txt');
    const result = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json');
    expect(result).toEqual(expectedResult);
  });
});

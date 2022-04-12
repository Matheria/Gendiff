import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import fileParse from './parsers.js';
import stylishFormatter from './formatters/stylish.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const file = fs.readFileSync(fullPath, 'utf-8');

  return file;
};

const genDiff = (filepath1, filepath2) => {
  const fileExtension1 = path.extname(filepath1);
  const fileExtension2 = path.extname(filepath2);
  const parsedFile1 = fileParse(readFile(filepath1), fileExtension1);
  const parsedFile2 = fileParse(readFile(filepath2), fileExtension2);
  const keys = Object.keys({ ...parsedFile1, ...parsedFile2 }).sort();

  let result = '{\n';

  keys.forEach((key) => {
    const key1 = parsedFile1[key];
    const key2 = parsedFile2[key];

    if (key1 === key2) {
      result += `    ${key}: ${key1}\n`;
      return;
    }

    if (_.has(parsedFile1, key)) {
      result += `  - ${key}: ${key1}\n`;
    }

    if (_.has(parsedFile2, key)) {
      result += `  + ${key}: ${key2}\n`;
    }
  });

  result += '}';

  return result;
};

export default genDiff;

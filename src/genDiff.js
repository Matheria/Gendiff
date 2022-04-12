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

  const iter = (obj1, obj2) => {
    const keys = Object.keys({ ...obj1, ...obj2 }).sort();

    return keys.reduce((acc, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        acc.push({ key, value: iter(value1, value2), hasChildren: true });
        return acc;
      }

      if (value1 === value2) {
        acc.push({ key, status: 'unchanged', value: value1 });
        return acc;
      }

      if (_.has(obj1, key)) {
        acc.push({ key, status: 'deleted', value: value1 });
      }

      if (_.has(obj2, key)) {
        acc.push({ key, status: 'added', value: value2 });
      }

      return acc;
    }, []);
  };

  const ast = iter(parsedFile1, parsedFile2);

  return stylishFormatter(ast);
};

export default genDiff;

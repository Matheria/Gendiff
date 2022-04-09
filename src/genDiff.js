import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const file = fs.readFileSync(fullPath, 'utf-8');

  return file;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(readFile(filepath1));
  const data2 = JSON.parse(readFile(filepath2));
  const keys = Object.keys({ ...data1, ...data2 }).sort();
  let result = '{\n';

  keys.forEach((key) => {
    const key1 = data1[key];
    const key2 = data2[key];

    if (key1 === key2) {
      result += `    ${key}: ${key1}\n`;
      return;
    }

    if (_.has(data1, key)) {
      result += `  - ${key}: ${key1}\n`;
    }

    if (_.has(data2, key)) {
      result += `  + ${key}: ${key2}\n`;
    }
  });

  result += '}';

  return result;
};

export default genDiff;

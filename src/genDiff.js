import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (pathToFile) => {
  const fullPathToFile = path.resolve(process.cwd(), pathToFile);
  const data = fs.readFileSync(fullPathToFile, 'utf-8');

  return data;
};

const genDiff = (pathToFile1, pathToFile2) => {
  const data1 = JSON.parse(readFile(pathToFile1));
  const data2 = JSON.parse(readFile(pathToFile2));
  const keys = Object.keys({ ...data1, ...data2 }).sort();
  let result = '{\n';

  for (const key of keys) {
    const key1 = data1[key];
    const key2 = data2[key];

    if (_.has(data1, key)) {
      return result += `  - ${key}: ${key1}\n`;
    }

    if (_.has(data2, key)) {
      return result += `  + ${key}: ${key2}\n`;
    }

    if (key1 === key2) {
      return result += `    ${key}: ${key1}\n`;
    }
  }

  result += '}';

  return result;   
};

export default genDiff;

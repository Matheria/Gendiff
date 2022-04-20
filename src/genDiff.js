import fs from 'fs';
import path from 'path';
import dataParse from './parsers.js';
import changeFormatter from './formatters/index.js';
import buildDiffTree from './buildDiffTree.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const file = fs.readFileSync(fullPath, 'utf-8');

  return file;
};

const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileFormat1 = getFileFormat(filepath1);
  const fileFormat2 = getFileFormat(filepath2);

  const parsedFile1 = dataParse(readFile(filepath1), fileFormat1);
  const parsedFile2 = dataParse(readFile(filepath2), fileFormat2);

  const diffTree = buildDiffTree(parsedFile1, parsedFile2);

  return changeFormatter(diffTree, formatName);
};

export default genDiff;

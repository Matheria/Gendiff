import fs from 'fs';
import path from 'path';
import fileParse from './parsers.js';
import changeFormatter from './formatters/index.js';
import buildDiffTree from './buildDiffTree.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const file = fs.readFileSync(fullPath, 'utf-8');

  return file;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileExtension1 = path.extname(filepath1);
  const fileExtension2 = path.extname(filepath2);
  const parsedFile1 = fileParse(readFile(filepath1), fileExtension1);
  const parsedFile2 = fileParse(readFile(filepath2), fileExtension2);
  const buildAst = buildDiffTree(parsedFile1, parsedFile2);

  return changeFormatter(buildAst, formatName);
};

export default genDiff;

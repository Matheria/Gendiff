import _ from 'lodash';

const INDENT = ' '.repeat(4);

const STATUS_MAP = {
  added: '+',
  deleted: '-',
};

const getIndent = (depth) => INDENT.repeat(depth);

const getSymbol = (status) => {
  if (!_.has(STATUS_MAP, status)) {
    return ' ';
  }

  return STATUS_MAP[status];
};

const transformObject = (obj) => {
  const entries = Object.entries(obj);

  return entries.map(([key, value]) => ({ key, value }));
};

const stylishFormatter = (diff) => {
  const stylish = (ast, depth = 0) => {
    let result = '{\n';

    const newAst = _.isPlainObject(ast) ? transformObject(ast) : [...ast];

    newAst.forEach((item) => {
      const { key, value, status } = item;

      if (item.hasChildren || _.isPlainObject(value)) {
        result += `${getIndent(depth)}  ${getSymbol(status)} ${key}: ${stylish(value, depth + 1)}\n`;
        return;
      }

      result += `${getIndent(depth)}  ${getSymbol(status)} ${key}: ${value}\n`;
    });

    result += `${getIndent(depth)}${'}'}`;

    return result;
  };

  return stylish(diff);
};

export default stylishFormatter;

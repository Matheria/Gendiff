import _ from 'lodash';

const INDENT = ' '.repeat(4);

const getIndent = (depth) => INDENT.repeat(depth);

const stringify = (data, depth) => {
  if (_.isPlainObject(data)) {
    const entries = Object.entries(data);

    const result = entries.map(([key, value]) => `${getIndent(depth + 1)}    ${key}: ${stringify(value, depth + 1)}`);

    return `{\n${result.join('\n')}\n${getIndent(depth + 1)}}`;
  }

  return data;
};

const mapping = {
  nested: ({ key, value }, depth, fn) => `${getIndent(depth)}    ${key}: ${fn(value, depth + 1)}`,
  added: ({ key, value }, depth) => `${getIndent(depth)}  + ${key}: ${stringify(value, depth)}`,
  deleted: ({ key, value }, depth) => `${getIndent(depth)}  - ${key}: ${stringify(value, depth)}`,
  unchanged: ({ key, value }, depth) => `${getIndent(depth)}    ${key}: ${stringify(value, depth)}`,
  updated: ({ key, value, oldValue }, depth) => {
    const data1 = `${getIndent(depth)}  - ${key}: ${stringify(oldValue, depth)}`;
    const data2 = `${getIndent(depth)}  + ${key}: ${stringify(value, depth)}`;

    return [data1, data2];
  },
};

const stylishFormatter = (ast, depth = 0) => {
  const result = ast.flatMap((item) => mapping[item.type](item, depth, stylishFormatter));

  return `{\n${result.join('\n')}\n${getIndent(depth)}}`;
};

export default stylishFormatter;

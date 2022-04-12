import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

const changeFormatter = (diff, format) => {
  if (format === 'plain') {
    return plainFormatter(diff);
  }

  return stylishFormatter(diff);
};

export default changeFormatter;

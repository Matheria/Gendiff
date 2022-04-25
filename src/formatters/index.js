import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

const changeFormatter = (diff, format) => {
  switch (format) {
    case 'plain':
      return plainFormatter(diff);
    case 'json':
      return JSON.stringify(diff);
    case 'stylish':
      return stylishFormatter(diff);
    default:
      throw new Error(`Unknown type of format: ${format}`);
  }
};

export default changeFormatter;

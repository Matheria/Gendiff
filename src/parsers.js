import yaml from 'js-yaml';

const fileParse = (file, extension = 'json') => {
  switch (extension) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return yaml.load(file);
    default:
      throw new Error(`Unsupported file extension: ${extension}`);
  }
};

export default fileParse;

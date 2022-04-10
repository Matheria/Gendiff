import yaml from 'js-yaml';

const fileParse = (file, extension = '.json') => {
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(file);
  }

  return JSON.parse(file);
};

export default fileParse;

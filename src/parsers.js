import yaml from 'js-yaml';

const dataParse = (data, dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported format: ${dataType}`);
  }
};

export default dataParse;

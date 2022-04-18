import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const isObj1HasKey = _.has(obj1, key);
    const isObj2HasKey = _.has(obj2, key);

    if (!isObj1HasKey) {
      return [...acc, { key, type: 'added', value: value2 }];
    }

    if (!isObj2HasKey) {
      return [...acc, { key, type: 'deleted', value: value1 }];
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return [
        ...acc,
        {
          key,
          type: 'nested',
          value: buildDiffTree(value1, value2),
        }];
    }

    if (!_.isEqual(value1, value2)) {
      return [
        ...acc,
        {
          key,
          type: 'updated',
          value: value2,
          oldValue: value1,
        }];
    }

    return [...acc, { key, type: 'unchanged', value: value1 }];
  }, []);
};

export default buildDiffTree;

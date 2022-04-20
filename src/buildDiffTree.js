import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return keys.map((key) => {
    const isObj1HasKey = _.has(obj1, key);
    const isObj2HasKey = _.has(obj2, key);

    if (!isObj1HasKey) {
      return { key, type: 'added', value: obj2[key] };
    }

    if (!isObj2HasKey) {
      return { key, type: 'deleted', value: obj1[key] };
    }

    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', value: buildDiffTree(value1, value2) };
    }

    if (!_.isEqual(value1, value2)) {
      return {
        key, type: 'updated', value: value2, oldValue: value1,
      };
    }

    return { key, type: 'unchanged', value: value1 };
  });
};

export default buildDiffTree;

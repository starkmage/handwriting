function flatten(obj, prefix = '', result = {}) {
  if (typeof obj !== 'object' || obj === null) {
    result[prefix] = obj;

    return result;
  }

  const keys = Object.keys(obj)

  for (const key of keys) {
    const value = obj[key];

    const newKey = prefix
      ? Array.isArray(obj) ? `${prefix}[${key}]` : `${prefix}.${key}`
      : key;

    flatten(value, newKey, result);
  }

  return result;
}

const input = {
  a: 'test',
  b: [10, 19, {c: 30}],
  d: {
    e: 'name',
    f: {
      g: 'value'
    }
  }
}

const output = flatten(input)

console.log(output)

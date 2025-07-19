const stringify = (obj) => {
  const type = typeof obj

  if (obj === null) {
    return "null"
  }

  if (type === 'string') {
    return `"${obj}"`
  }

  if (type === 'number' || type === 'boolean') {
    return String(obj)
  }

  if (Array.isArray(obj)) {
    return '[' + obj.map(stringify).join(',') + ']'
  }

  if (type === 'object') {
    const props = Object.entries(obj).map(([key, value]) => {
      return `"${key}":${stringify(value)}`
    })

    return `{${props.join(',')})`
  }

  return undefined
}

const res = stringify(123)
console.log(res);

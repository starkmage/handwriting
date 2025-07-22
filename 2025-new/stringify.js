const stringify = (obj) => {
  const seen = new WeakSet()

  const _stringify = (value) => {
    const type = typeof value

    if (value === null) {
      return 'null'
    }

    if (type === 'undefined' || type === 'function' || type === 'symbol') {
      return undefined
    }

    if (type === 'string') {
      return `"${value}"`
    }

    if (type === 'number' || type === 'boolean') {
      return String(value)
    }

    // 处理日期对象
    if (value instanceof Date) {
      return `"${value.toISOString()}"`;
    }

    // 处理正则表达式
    if (value instanceof RegExp) {
      return `"${value.toString()}"`;
    }


    if (Array.isArray(value)) {
      const result = value.map((item) => {
        const str = _stringify(item)
        // JSON.stringify 会把数组中的 undefined 变为 null
        return str === undefined ? 'null' : str
      })

      return `[${result.join(',')}]`
    }

    if (type === 'object') {
      if (seen.has(value)) {
        throw new Error('Converting circular structure')
      }

      seen.add(value)

      const props = Object.entries(value).filter((key, value) => {
        const type = typeof value
        return type !== 'undefined' && type !== 'function' && type !== 'symbol'
      }).map((key, value) => {
        return `"${key}":${_stringify(value)}`
      }).join(',')

      seen.delete(value)

      return `{${props}}`
    }

    return undefined
  }

  return _stringify(obj)
}

const res1 = stringify({ a: 1, b: undefined })  // '{"a":1}'
const res2 = stringify([1, undefined, 3])       // '[1,null,3]'
const res3 = stringify({ a: function () { } })    // '{}'

console.log({ res1, res2, res3 })
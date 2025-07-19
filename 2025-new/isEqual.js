const isEqual = (a, b) => {
  if (Object.is(a, b)) {
    return true
  }

  if (typeof a !== typeof b) {
    return false
  }

  if (a === null || b === null) {
    return false
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString()
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) {
      return false
    }

    for (const key of keysA) {
      if (!b.hasOwnProperty(key)) {
        return false
      }

      if (!isEqual(a[key], b[key])) {
        return false
      }
    }

    return true
  }

  return false
}
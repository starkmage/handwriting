// 力扣2628

var areDeeplyEqual = function (o1, o2) {
  if (Object.is(o1, o2)) {
    return true
  }

  if (o1 === null || o2 === null) {
    return false
  }

  if (o1 instanceof RegExp && o2 instanceof RegExp) {
    return o1.toString() === o2.toString()
  }

  if (o1 instanceof Date && o2 instanceof Date) {
    return o1.getTime() === o2.getTime()
  }

  if (typeof o1 === 'object' && typeof o2 === 'object') {
    const keys1 = Object.keys(o1)
    const keys2 = Object.keys(o2)

    if (keys1.length !== keys2.length) {
      return false
    }

    if (Array.isArray(o1) && Array.isArray(o2)) {
      return o1.every((item, index) => areDeeplyEqual(o1[index], o2[index]))
    }
    if (Array.isArray(o1) || Array.isArray(o2)) {
      return false
    }

    for (const key of keys1) {
      if (!areDeeplyEqual(o1[key], o2[key])) {
        return false
      }
    }

    return true
  }

  return false
};
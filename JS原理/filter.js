// 力扣2634

Array.prototype.myFilter = function(callback, context) {
  const result = []

  for (let i = 0; i < this.length; i++) {
    const value = this[i]
    if (callback.call(context, value, i, this)) {
      result.push(value)
    }
  }

  return result
}
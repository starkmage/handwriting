// 力扣2626

Array.prototype.myReduce = function(callback, pre) {
  for (let i = 0; i < this.length; i++) {
    if (pre === undefined) {
      pre = callback(this[i], this[i + 1], i + 1, this)
      // 注意
      i++
    } else {
      pre = callback(pre, this[i], i, this)
    }
  }
  return pre
}

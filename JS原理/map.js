// 第二个参数为 callback 执行时候的 this，为可选参数
Array.prototype.myMap = function(callback, context) {
  let res = []
  for (let i = 0; i < this.length; i++) {
    res.push(callback.call(context, this[i], i, this))
  }
  return res
}

// 使用 reduce 实现 map
Array.prototype.myMap2 = function(callback, context) {
  let res = []
  this.reduce((pre, val, index, arr) => {
    res.push(callback.call(context, val, index, arr))
  }, [])
  return res
}


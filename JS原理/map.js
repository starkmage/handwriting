Array.prototype.myMap = function(callback) {
  let res = []
  for (let i in this) {
    res.push(callback(this[i], i, this))
  }
  return res
}
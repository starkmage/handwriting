function myInstanceOf(left, right) {
  //对基本数据类型，返回false
  if (typeof left !== 'object' || left === null || typeof left !== 'function') return false
  left = left.__proto__
  while (true) {
    if (left === null) return false
    if (left === right.prototype) return true
    left = left.__proto__
  }
}

console.log(myInstanceOf('1', String));
console.log(myInstanceOf({}, Object));
console.log(myInstanceOf([], Array));
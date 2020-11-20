// 1.扩展运算符
function f1(a, b) {
  return [...arguments]
}

// 2.Array.from()
function f2(arg) {
  return Array.from(arguments)
}

// 3. slice.call
function f3(a, b) {
  return Array.prototype.slice.call(arguments)
}

// 4.利用 concat + apply
function f4(a, b) {
  // apply方法会把第二个参数展开
  return Array.prototype.concat.apply([], arguments)
}

// 5. 原始方法
function f5(a, b) {
  const res = []
  for (let val of arguments) {
    res.push(val)
  }
  return res
}
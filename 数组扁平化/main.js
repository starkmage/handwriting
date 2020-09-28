//1. flat方法
function flatten1(array) {
  return array.flat(Infinity)
}

//2. 扩展运算符
function flatten2(array) {
  while (array.some(value => Array.isArray(value))) {
    array = [].concat(...array)
  }
  return array
}

//3. 转换成字符串
function flatten3(array) {
  let str = array.toString()
  return str.split(',').map(item => parseInt(item))
}

//4. reduce递归
function flatten4(array) {
  return array.reduce((pre, item) => {
    return pre.concat(Array.isArray(item) ? flatten4(item) : item)
  }, [])
}

//5. 普通递归
function flatten5(array) {
  let res = []
  array.forEach(item => {
    if (Array.isArray(item)) {
      res = res.concat(flatten5(item))
    } else {
      res.push(item)
    }
  })
  return res
}


let ary = [1, 2, [3, 4], [5, [6, 7]]]
let res = flatten2(ary)
console.log(res);

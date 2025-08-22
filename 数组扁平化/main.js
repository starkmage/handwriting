//1. flat方法
function flatten1(array) {
  return array.flat(Infinity)
}

//2. 扩展运算符
// 利用 concat 既可以接收数组参数，也可以接收数字
function flatten2(array) {
  while (array.some(value => Array.isArray(value))) {
    array = [].concat(...array)
  }
  return array
}

//3. 转换成字符串
function flatten3(array) {
  let str = array.toString()
  return str.split(',').map(item => parseFloat(item))
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
      // concat的参数也可以是值，前面用过
      res = res.concat(item)
    }
  })
  return res
}


// 补充：自定义flat
Array.prototype.myFlat = function(deep) {
  let res = JSON.parse(JSON.stringify(this))
  while (deep > 0 && res.some(item => Array.isArray(item))) {
    res = [].concat(...res)
    deep--
  }
  return res
}


let ary = [1, 2, [3, 4], [5, [6, 7]]]
let res = ary.myFlat(3)
console.log(res);

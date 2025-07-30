// 实现一个 isType(value) 函数，判断 JS 类型
const isType = (value) => {
  const type = Object.prototype.toString.call(value)
  const output = type.slice(8, type.length - 1)

  return output.toLowerCase()
}

/*
写一个判断是否为“类数组”的函数
类数组特征：有 length 属性，且是非函数对象，索引为 0、1、2...。
*/
const isArrayLike = (obj) => {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    typeof obj.length === 'number' &&
    obj.length >= 0 &&
    Number.isInteger(obj.length)
  )
} 

/* 
typeof null === 'object' 的解释
这个是 JavaScript 历史遗留的bug。

📌 原因解释：
在早期 JS 的设计中，值的类型由内部标签表示，null 被误设为了 object 类型标签。

isNull的实现
*/
const isNull = (value) => {
  return Object.prototype.toString.call(value) === '[object Null]'
}
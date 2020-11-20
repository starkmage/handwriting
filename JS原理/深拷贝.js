// 考虑循环引用的问题
function deeepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  // 不用担心函数，因为函数只是一个地址，你把这个地址复制了，修改原来的这个属性，只是修改了地址指向，复制的并没有变化
  if (typeof obj !== 'object') return obj
  if (hash.get(obj)) return hash.get(obj)
  let cloneObj = new obj.constructor()
  hash.set(obj, cloneObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deeepClone(obj[key], hash)
    }
  }
  return cloneObj
}


let obj = {
  a: 'asd',
  b: 'ssasd'
}

let o = deeepClone(obj)

console.log(o);
function myNew(callback, ...args) {
  let obj = {}
  obj.__proto__ = callback.prototype
  let result = callback.apply(obj, args)
  return result instanceof Object ? result : obj
}
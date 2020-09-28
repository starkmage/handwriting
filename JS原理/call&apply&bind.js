//手写call
Function.prototype.myCall = function(context) {
  if (typeof this !== 'function') throw 'type error'
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  let result = context.fn(...args)
  delete context.fn
  return result
}

//手写apply
Function.prototype.myApply = function(context) {
  if (typeof this !== 'function') throw "type error"
  context = context || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

//手写bind
Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') throw 'type error'
  const _this = this
  const args = [...arguments].slice(1)
  //bind 返回一个函数
  return function F() {
    //对于函数来说有两种方式调用，一种是通过 new 的方式
    if (this instanceof F) {
      //对于 new 的情况来说，不会被任何方式改变 this，所以对于这种情况我们需要忽略传入的 this
      return new _this(...args, ...arguments)
    }
    //一种是直接调用
    //因为 bind 可以实现类似这样的代码 f.bind(obj, 1)(2)，
    //所以我们需要将两边的参数拼接起来，于是就有了这样的实现 args.concat(...arguments)
    return _this.apply(context, args.concat(...arguments))
  }
}
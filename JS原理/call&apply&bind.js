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
Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;
  var args1 = [...arguments].slice(1);

  var fn = function () {};
  fn.prototype = this.prototype

  var res = function () {
      var args2 = [...arguments];
      return self.apply(this instanceof fn ? this : context, args1.concat(args2));
  }
  res.prototype = new fn()
  
  return res;
}
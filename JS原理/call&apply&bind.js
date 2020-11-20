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
  var args = [...arguments].slice(1);

  var fNOP = function () {};

  var fBound = function () {
      var bindArgs = [...arguments];
      return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}
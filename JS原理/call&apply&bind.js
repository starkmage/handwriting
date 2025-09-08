//手写call，力扣2693
Function.prototype.myCall = function(context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.myCall - what is trying to be called is not callable');
  }
  
  const fn = Symbol('fn'); // 使用Symbol避免属性名冲突
  context[fn] = this;
  
  const result = context[fn](...args);
  delete context[fn];
  
  return result;
};

//手写apply
Function.prototype.myApply = function(context = window, args = []) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.myApply - what is trying to be applied is not callable');
  }
  
  if (!Array.isArray(args)) {
    throw new TypeError('Function.prototype.myApply - second argument must be an array');
  }
  
  const fn = Symbol('fn');
  context[fn] = this;
  
  const result = context[fn](...args);
  delete context[fn];
  
  return result;
};

//手写bind
Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }
  
  const self = this;
  
  const fBound = function(...bindArgs) {
    return self.apply(
      this instanceof fBound ? this : context,
      [...args, ...bindArgs]
    );
  };
  
  fBound.prototype = Object.create(this.prototype);
  
  return fBound;
};
function myEventBus() {
  this.events = new Map()
}

// 1. 添加事件订阅
// 1.1 包装回调函数
const wrapCallback = (fn, isOnce = false) => {
  return {
    callback: fn,
    isOnce
  }
}
// 1.2 正式添加
myEventBus.prototype.addListener = function(type, fn, isOnce = false) {
  let handler = this.events.get(type)
  const wrap = wrapCallback(fn, isOnce)
  if (!handler) {
    this.events.set(type, wrap)
  } else if (typeof handler.callback === 'function') {
    this.events.set('type', [handler, wrap])
  } else {
    handler.push(wrap)
  }
}

// 2. 添加只触发一次的事件
myEventBus.prototype.once = function(type, fn) {
  this.addListener(type, fn, true)
}

// 3. 移除订阅者
myEventBus.prototype.removeListener = function(type, listener) {
  let handler = this.events.get(type)
  if (!handler) return
  if (!Array.isArray(handler)) {
    if (handler.callback === listener.callback) this.events.delete(type)
    else return
  } else {
    for (let i in handler) {
      let item = handler[i]
      if (item.callback === listener.callback) {
        handler.splice(i, 1)
        i--
        // 长度为1，不需要变成数组
        if (handler.length === 1) {
          this.events.set(type, handler[0])
        }
      }
    }
  }
}

// 4. 触发事件 type
myEventBus.prototype.emit = function(type, ...args) {
  let handler = this.events.get(type)
  if (!handler) return
  if (Array.isArray(handler)) {
    // 有多个订阅者，依次回调
    for (let item of handler) {
      item.callback.apply(this, args)
      if (item.isOnce) this.removeListener(type, item)
    }
  } else {
    // 只有一个订阅者
    handler.callback.apply(this, args)
    if (handler.isOnce) this.removeListener(type, handler)
  }
}

// 5. 移除所有订阅者
myEventBus.prototype.removeAllListener = function(type) {
  let handler = this.events.get(type)
  if (!handler) return
  else this.events.delete(type)
}

// 为什么不单纯维护一个数组存储订阅者，而是区分不同情况？
// 因为源码里就是这么做的，模仿源码

// 测试
let e = new myEventBus();
e.addListener('type', () => {
  console.log("type事件触发！");
})
e.addListener('type', () => {
  console.log("WOW!type事件又触发了！");
})

function f() { 
  console.log("type事件我只触发一次"); 
}
e.once('type', f)
e.emit('type');
e.emit('type');
e.removeAllListener('type');
e.emit('type');
const wrapCallback = (fn, isOnce = false) => {
  return {
    callback: fn,
    isOnce
  }
}

class myEventBus {
  constructor() {
    this.events = new Map()
  }

  // 监听
  on(type, fn, isOnce = false) {
    let handler = wrapCallback(fn, isOnce)
    let event = this.events.get(type)
    if (!event) {
      this.events.set(type, [handler])
    } else {
      event.push(handler)
    }
  }

  // 一次性监听
  once(type, fn) {
    this.on(type, fn, true)
  }

  // 触发事件
  emit(type, ...args) {
    let event = this.events.get(type)
    if (!event) return
    for (let e of event) {
      e.callback.apply(this, args)
      if (e.isOnce) {
        this.off(type, e)
      }
    }
  }

  // 移除事件
  off(type, listener) {
    let event = this.events.get(type)
    if (!event) return
    for (let i = 0; i < event.length; i++) {
      let e = event[i]
      if (e.callback === listener.callback) {
        event.splice(i, 1)
        i--
        if (event.length === 0) {
          this.events.delete(type)
        }
      }
    }
  }

  // 移除所有事件
  removeAll(type) {
    let event = this.events.get(type)
    if (!event) return
    this.events.delete(type)
  }
}

let e = new myEventBus();
e.on('type', () => {
  console.log("type事件触发！");
})
e.on('type', () => {
  console.log("WOW!type事件又触发了！");
})

function f() { 
  console.log("type事件我只触发一次"); 
}
e.once('type', f)
e.emit('type');
e.emit('type');
e.removeAll('type');
e.emit('type');
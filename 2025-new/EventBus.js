class EventBus {
  constructor() {
    this.events = new Map(); // 存储事件和对应的回调函数
    this.temporaryBlocked = new Set(); // 临时中断的事件集合
    this.callStack = new Set(); // 调用栈用于检测循环依赖
  }

  /**
   * 订阅事件
   * @param {string} eventName 事件名称
   * @param {function} callback 回调函数
   * @param {object} options 配置选项
   * @param {boolean} [options.once=false] 是否只执行一次
   * @param {string} [options.id] 订阅者ID，用于多对多通信
   */
  on(eventName, callback, options = {}) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Map());
    }

    const subscribers = this.events.get(eventName);
    const subscriberId = options.id || Symbol('subscriber');

    subscribers.set(subscriberId, {
      callback,
      once: options.once || false,
      id: subscriberId
    });

    return subscriberId; // 返回订阅者ID，可用于取消订阅
  }

  /**
   * 一次性订阅
   * @param {string} eventName 事件名称
   * @param {function} callback 回调函数
   */
  once(eventName, callback) {
    return this.on(eventName, callback, { once: true });
  }

  /**
   * 发布事件
   * @param {string} eventName 事件名称
   * @param {*} data 传递的数据
   * @param {object} options 配置选项
   * @param {string} [options.targetId] 目标订阅者ID，用于1对1通信
   */
  emit(eventName, data, options = {}) {
    // 检查事件是否被临时中断
    if (this.temporaryBlocked.has(eventName)) {
      return;
    }

    if (!this.events.has(eventName)) {
      return;
    }

    // 检查循环依赖
    if (this.callStack.has(eventName)) {
      throw new Error(`Circular dependency detected for event: ${eventName}`);
    }

    this.callStack.add(eventName);

    const subscribers = this.events.get(eventName);

    // 1对1通信
    if (options.targetId) {
      const subscriber = subscribers.get(options.targetId);
      if (subscriber) {
        try {
          subscriber.callback(data);
          if (subscriber.once) {
            subscribers.delete(options.targetId);
          }
        } catch (err) {
          console.error(`Error in event handler for ${eventName}:`, err);
        }
      }
    }
    // 1对多或多对多通信
    else {
      // 创建副本以防在回调中修改订阅者列表
      const subscribersCopy = new Map(subscribers);

      subscribersCopy.forEach((subscriber, id) => {
        try {
          subscriber.callback(data);
          if (subscriber.once) {
            subscribers.delete(id);
          }
        } catch (err) {
          console.error(`Error in event handler for ${eventName}:`, err);
        }
      });
    }

    this.callStack.delete(eventName);
  }

  /**
   * 取消订阅
   * @param {string} eventName 事件名称
   * @param {string|symbol} subscriberId 订阅者ID
   */
  off(eventName, subscriberId) {
    if (!this.events.has(eventName)) {
      return;
    }

    const subscribers = this.events.get(eventName);
    subscribers.delete(subscriberId);

    if (subscribers.size === 0) {
      this.events.delete(eventName);
    }
  }

  /**
   * 临时中断事件
   * @param {string} eventName 事件名称
   */
  block(eventName) {
    this.temporaryBlocked.add(eventName);
  }

  /**
   * 恢复事件
   * @param {string} eventName 事件名称
   */
  unblock(eventName) {
    this.temporaryBlocked.delete(eventName);
  }

  /**
   * 清除所有事件
   */
  clear() {
    this.events.clear();
    this.temporaryBlocked.clear();
    this.callStack.clear();
  }
}

// 示例用法
const bus = new EventBus();

// 1对1通信示例
const subscriberId1 = bus.on('event1', (data) => {
  console.log('Subscriber 1 received:', data);
});

bus.emit('event1', 'Hello 1-to-1', { targetId: subscriberId1 });

// 1对多通信示例
bus.on('event2', (data) => {
  console.log('Subscriber A received:', data);
});

bus.on('event2', (data) => {
  console.log('Subscriber B received:', data);
});

bus.emit('event2', 'Hello 1-to-many');

// 多对多通信示例
const id1 = Symbol('publisher1');
const id2 = Symbol('publisher2');

bus.on('event3', (data) => {
  console.log('Subscriber X received from', data.from, ':', data.message);
}, { id: id1 });

bus.on('event3', (data) => {
  console.log('Subscriber Y received from', data.from, ':', data.message);
}, { id: id2 });

bus.emit('event3', { from: 'Publisher1', message: 'Hello multi-to-multi' }, { targetId: id1 });
bus.emit('event3', { from: 'Publisher2', message: 'Hi multi-to-multi' }, { targetId: id2 });

// 临时中断示例
bus.block('event2');
bus.emit('event2', 'This should not be received'); // 不会触发
bus.unblock('event2');
bus.emit('event2', 'Now this should be received'); // 会触发

// 循环依赖检测示例
bus.on('eventA', () => {
  bus.emit('eventB');
});

bus.on('eventB', () => {
  bus.emit('eventA');
});

try {
  bus.emit('eventA'); // 会抛出循环依赖错误
} catch (err) {
  console.error(err.message);
}
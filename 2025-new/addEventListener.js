/* 
DOM 事件传播机制定义了事件在 DOM 树中传播的完整过程，包括三个阶段：

1. 捕获阶段（Capture Phase）
事件从 window 对象开始，沿着 DOM 树向下传播到目标元素的父节点
在这个阶段注册的事件监听器会先于目标元素上的监听器被触发
使用 addEventListener 的第三个参数设为 true 来监听捕获阶段

2. 目标阶段（Target Phase）
事件到达目标元素本身
在这个阶段，事件会在目标元素上触发所有监听器（无论是否设置为捕获）
事件对象的 eventPhase 属性值为 Event.AT_TARGET

3. 冒泡阶段（Bubble Phase）
事件从目标元素开始，沿着 DOM 树向上传播回 window 对象
这是默认的事件传播行为
使用 addEventListener 的第三个参数设为 false 或省略来监听冒泡阶段
*/

class SimulatedNode {
  constructor(name) {
    this.name = name
    this.parent = null
    this.children = []
    this.listeners = new Map()
  }

  appendChild(child) {
    child.parent = this
    this.children.push(child)
  }

  addEventListener(type, callback, useCapture = false) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, [])
    }

    const typeListeners = this.listeners.get(type)
    typeListeners.push({
      callback,
      capture: useCapture
    })
  }

  dispatchEvent(event) {
    const path = []

    let node = this
    // 从目标向上构建路径：target -> root
    while (node) {
      path.unshift(node); // 根节点在前
      node = node.parent;
    }

    // 捕获阶段：从 root 到 target（capture=true）
    for (let i = 0; i < path.length; i++) {
      const current = path[i]
      const listeners = current.listeners.get(event.type) ?? []
      for (const { callback, capture } of listeners) {
        if (capture) {
          callback({
            type: event.type,
            target: this,
            currentTarget: current,
            phase: 'capture'
          })
        }
      }
    }

    // 冒泡阶段：从 target 到 root（capture=false）
    for (let i = path.length - 1; i >= 0; i--) {
      const current = path[i]
      const listeners = current.listeners.get(event.type) ?? []
      for (const { callback, capture } of listeners) {
        if (!capture) {
          callback({
            type: event.type,
            target: this,
            currentTarget: current,
            phase: 'bubble'
          })
        }
      }
    }
  }
}

// 创建模拟 DOM 树
const root = new SimulatedNode('root');
const parent = new SimulatedNode('parent');
const child = new SimulatedNode('child');

root.appendChild(parent);
parent.appendChild(child);

// 添加事件监听器
root.addEventListener('click', (e) => {
  console.log(`[${e.phase}] ${e.currentTarget.name}`);
}, true); // capture

parent.addEventListener('click', (e) => {
  console.log(`[${e.phase}] ${e.currentTarget.name}`);
}, true); // capture

child.addEventListener('click', (e) => {
  console.log(`[${e.phase}] ${e.currentTarget.name}`);
}); // 默认 bubble

parent.addEventListener('click', (e) => {
  console.log(`[${e.phase}] ${e.currentTarget.name}`);
}); // bubble

root.addEventListener('click', (e) => {
  console.log(`[${e.phase}] ${e.currentTarget.name}`);
}); // bubble

// 触发事件
child.dispatchEvent({ type: 'click' });

/* 输出结果：
[capture] root
[capture] parent
[bubble] child
[bubble] parent
[bubble] root
*/

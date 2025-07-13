function createContext(defaultValue) {
  const contextData = {
    value: defaultValue,
    subscribers: new Set(), // 订阅组件的回调（模拟重新渲染）
  };

  function Provider({ value, children }) {
    contextData.value = value;

    // 通知所有订阅者
    contextData.subscribers.forEach((callback) => {
      callback(value);
    });

    // 渲染 children（模拟）
    if (typeof children === 'function') {
      children(); // 如果 children 是函数就调用
    }
  }

  function useContext() {
    let localValue = contextData.value;

    // 模拟组件内一个状态变量来存 context 的值
    function subscribe(callback) {
      contextData.subscribers.add(callback);
    }

    function useContextInternal() {
      // 模拟一次“订阅”
      subscribe((newVal) => {
        localValue = newVal;
        console.log(`[Context update] New value: ${newVal}`);
      });
      return localValue;
    }

    return useContextInternal();
  }

  return {
    Provider,
    useContext,
  };
}



/*
使用示例
*/
const { Provider, useContext } = createContext('default')

function MyComponent() {
  const val = useContext()
  console.log('MyComponent render:', val)
}

Provider({
  value: 'hello',
  children: () => {
    MyComponent()
  }
})

Provider({
  value: 'world',
  children: () => {
    MyComponent()
  }
})

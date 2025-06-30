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
const {
  Provider: ThemeProvider,
  useContext: useTheme,
} = createContext('light');

function Button() {
  const theme = useTheme();
  console.log('Button theme:', theme);
}

// 模拟组件更新流程
function App() {
  ThemeProvider({
    value: 'dark',
    children: () => {
      Button();
    },
  });

  setTimeout(() => {
    console.log('\n---- Theme updated to light ----');
    ThemeProvider({
      value: 'light',
      children: () => {
        Button(); // 再次触发子组件使用 context
      },
    });
  }, 1000);
}

App();

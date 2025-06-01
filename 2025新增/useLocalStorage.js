import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // 从 localStorage 获取初始值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // 检查是否在客户端环境（避免 SSR 报错）
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        // 如果 localStorage 中有值，则解析返回，否则返回初始值
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 定义一个 setter 函数，用于更新状态和 localStorage
  const setValue = (value) => {
    try {
      // 允许值是一个函数（类似于 useState）
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // 更新状态
      setStoredValue(valueToStore);
      // 更新 localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 监听 localStorage 变化（跨标签页同步）
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          // 使用函数式更新确保获取最新状态
          setStoredValue(prevValue => {
            if (JSON.stringify(newValue) !== JSON.stringify(prevValue)) {
              return newValue;
            }
            return prevValue;
          });
        } catch (error) {
          console.error(error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]); // 只需要 key 作为依赖

  return [storedValue, setValue];
}

export default useLocalStorage;
import { useCallback, useEffect, useRef } from 'react';

function useTimeout(callback, delay) {
  const timerRef = useRef(null)
  const savedCallbackRef = useRef(callback);

  // 保存最新的回调函数
  /*
  直接使用 callback 的问题在于 ​​闭包陷阱​​（Stale Closure Problem）。
  在 useEffect 或 useTimeout 这类 Hook 中，如果直接依赖 callback，可能会导致回调函数访问的是旧的变量值，而不是最新的值。
  */
  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (delay < 0) {
      return;
    }

    timerRef.current = setTimeout(() => {
      savedCallbackRef.current()
    }, delay);

    return () => {
      clear()
    };
  }, [delay]);

  return clear;
}

export default useTimeout;
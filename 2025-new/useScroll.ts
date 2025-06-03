import { useState, useEffect, useRef, RefObject } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

// 带节流的监听窗口滚动
const useScroll = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: window.scrollX,
    y: window.scrollY,
  });
  const rafRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        setScrollPosition({
          x: window.scrollX,
          y: window.scrollY,
        });
      })
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    };
  }, []);

  return scrollPosition;
}

// 监听某个元素滚动
const useElementScroll = (elementRef: RefObject<HTMLElement>): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  const rafRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        setScrollPosition({
          x: element.scrollLeft,
          y: element.scrollTop,
        });
      })
    };

    element.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      element.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    };
  }, [elementRef]);

  return scrollPosition;
}

/*
passive: true 是一个现代浏览器提供的性能优化选项，用于事件监听器。在滚动场景中使用它能显著提升页面性能。

核心作用
  性能优化​​：
告诉浏览器这个事件监听器​​不会调用​​ preventDefault()
允许浏览器​​立即执行滚动​​而不需要等待事件监听器完成
  解决滚动卡顿问题​​：
没有 passive: true 时，浏览器必须等待事件监听器执行完毕才能滚动
这会导致明显的滚动延迟（特别是在移动设备上）
*/
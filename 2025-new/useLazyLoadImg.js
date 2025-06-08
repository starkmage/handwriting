import { useEffect, useRef } from 'react';

function useLazyLoadAll(containterRef) {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!containterRef.current) {
      return
    }
    // 配置 IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observerRef.current.unobserve(img); // 停止监听已加载图片
            }
          }
        });
      },
      {
        // 关键：设置 root 为 containerRef则是相对container的懒加载，null则是相对整个视口viewport的
        root: containerRef.current, 
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    // 自动监听现有图片
    const images = containterRef.current.querySelectorAll('img[data-src]');
    images.forEach(img => observerRef.current.observe(img));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
}

export default useLazyLoadAll;
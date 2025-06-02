
/*
方法 1：基于 IntersectionObserver（推荐）​​
IntersectionObserver 是浏览器提供的 API，可以高效监听元素是否进入视口。
*/
<img class="lazy" data-src="real-image.jpg" src="placeholder.jpg" alt="Lazy Image"></img>

document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = document.querySelectorAll("img.lazy");

  // 1. 创建 IntersectionObserver 实例
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { // 图片进入视口
        const img = entry.target;
        img.src = img.dataset.src; // 替换真实图片
        img.classList.remove("lazy"); // 可选：移除懒加载类
        observer.unobserve(img); // 停止监听已加载的图片
      }
    });
  }, {
    rootMargin: "100px", // 提前 100px 触发加载
    threshold: 0.1 // 至少 10% 进入视口时触发
  });

  // 2. 监听所有懒加载图片
  lazyImages.forEach(img => observer.observe(img));
});


/*
方法 2：loading="lazy"（原生懒加载，现代浏览器支持）​​
现代浏览器（Chrome、Edge、Firefox）支持原生懒加载
*/
<img src="image.jpg" loading="lazy" alt="Lazy Image"></img>
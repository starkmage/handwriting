/*
代理模式（Proxy Pattern)

代理模式是一种结构型设计模式，为其他对象提供一个代理以控制对它的访问。

你可以把它理解为“中间人”或者“壳子”：

这个壳子对外表现得像原对象，但它可以在访问前后加逻辑，比如缓存、权限、延迟加载等。
*/

function fetchData(url) {
  return Promise.resolve({
    data: 'response from' + url
  })
}

const cache = new Map()

const cachedFetch = new Proxy(fetchData, {
  apply(target, thisArg, args) {
    const key = args[0]
    if (cache.has(key)) {
      return cache.get(key); // 直接返回 Promise
    } else {
      const promise = target(...args).then((res) => {
        cache.set(key, Promise.resolve(res)); // 缓存已解析的 Promise
        return res;
      });
      cache.set(key, promise); // 先缓存 Promise
      return promise;
    }
  }
})

// 使用
cachedFetch("/user"); // 网络请求
cachedFetch("/user"); // 缓存返回
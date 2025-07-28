/* 
下面这个题不难，但是面试没写出来

还是对promise的传递不熟悉
*/

const fetchData = () => {
  console.log('fetching')

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('123')
    })
  })
}

const main = () => {
  const promisesFn = Array(10).fill(fetchData)

  const promise = promisesFn.map((fn) => {
    return fn()
  })

  Promise.all(promise).then((value) => console.log(value))
}


const fn = (fetchData) => {
  let cache

  return () => {
    if (cache) {
      return cache
    } else {
      /* 
      面试的时候写成了下面这样
      当时认为里面的cache会覆盖外面的cache赋值
      但是，
      问题如注释所示
      */
      cache = fetchData().then((value) => {
        cache = Promise.resolve(value); // 更新 cache 为 PromiseC
        // 无 return → PromiseB 会 resolve 为 undefined
        // 加上return cache就没问题了
        return cache
      });
      
      return cache; // 返回的是 PromiseB
      /* 
      在 Promise.all执行时，cache​​仍然是 PromiseB（一个 resolve 为 undefined的 Promise）​​，而不是你期望的 PromiseC（Promise.resolve('123')）。这是因为：

      PromiseB是 .then()返回的新 Promise​​，它的状态由回调函数决定（此处因未 return而 resolve 为 undefined）。
      cache = Promise.resolve(value)只是更新了变量 cache​​，但无法改变 PromiseB的状态（Promise不可变）。
      Promise.all收集的是 PromiseB​​，而不是后来更新的 PromiseC。
      */

      /* 
      正确答案
      */
      cache = fetchData()

      return cache
    }
  }
}

const cachedFetchData = fn(fetchData)

const newMain = () => {
  const promisesFn = Array(10).fill(cachedFetchData)

  const promise = promisesFn.map((fn) => {
    return fn()
  })

  Promise.all(promise).then((value) => console.log(value))
}

// main()

newMain()
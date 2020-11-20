/*
考虑一种情况，一个搜索框，对搜索提示进行防抖节流处理，如何优化？
如果单纯的防抖，那么用户一直在打字的话，会一直得不到搜索提示。。。
如果是单纯的节流，很可能在用户完整的打完搜索内容时，不会生成对应的搜索提示（因为敲下最后一个字的时候，距离上次提示时间小于 wait）。。。
有一种思想是将「节流」和「防抖」合二为一，变成加强版的节流函数，关键点在于 wait 时间内，可以重新生成定时器，但只要 wait 的时间到了，必须给用户一个响应。
*/

function throttlePlus(fn, wait) {
  let last = 0, timer = 0
  return function(...args) {
    let now = +new Date()
    if (now - last > wait) {
      // 第一次执行，或者距离上次执行的时间间隔超出 wait 执行
      last = now
      fn.apply(this, args)
    }
    // 相对纯节流新增部分 
    else {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(this, args)
      }, wait)
    }
  }
}

// 参考文章：https://github.com/yygmind/blog/issues/39
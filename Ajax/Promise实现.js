function myAjax(options) {
  // 1. 参数获取
  const method = options.method.toLowerCase() || 'get'
  const url = options.url
  const async = options.async || 'true'
  // 请求参数
  const data = options.data

  // 2. 实例化
  const xhr = new XMLHttpRequest()
  if (options.timeout && options.timeout > 0) {
    xhr.timeout = options.timeout
  }

  // 3. 返回 Promise 对象
  return new Promise((resolve, reject) => {
    // 3.1 超时
    xhr.ontimeout = () => { reject && reject('请求超时') }

    // 3.2 请求状态改变
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          resolve && resolve(xhr.responseText)
        } else {
          reject && reject('请求失败')
        }
      }
    }

    // 3.3 请求错误
    xhr.onerror = () => { reject && reject('请求错误') }

    // 参数处理，可以参考百度时候的地址栏
    let paramArr = []
    let encodeData = ''
    if (data instanceof Object) {
      for (let key in data) {
        // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码
        paramArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      }
      encodeData = paramArr.join('&')
    }
    // get 请求需要在？后面拼接参数
    if (method === 'get') {
      let index = url.indexOf('?')
      if (index === '-1') url += '?'
      if (index !== url.length - 1) url += '&'
      url += encodeData
    }

    // 初始化
    xhr.open(method, url, async)

    // 发送请求
    if (method === 'get') {
      xhr.send(encodeData)
    } else {
      // post 请求需要设置请求头
      xhr.setRequestHeader('Content-type', 'application/x-www-from-unlencoded;charset=UTF-8')
      xhr.send(encodeData)
    }
  })
}
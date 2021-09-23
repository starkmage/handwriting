function myAjax(method, url, data, timeout) {
  return new Promise((resolve, reject) => {
    // 1. 创建xhr
    let xhr = new XMLHttpRequest()
    // 2. 设置回调
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) resolve(xhr.response)
        else reject(xhr.statusText)
      }
    }
    xhr.timeout = timeout
    xhr.ontimeout = () => {
      reject('请求超时')
      xhr.abort()
    }
    // 3. 拼接参数，发送请求
    if (method.toLowerCase() === 'get') {
      let arr = []
      for (let key in data) {
        arr.push(`${key}=${data[key]}`)
      }
      url += `?${arr.join('&')}`
      xhr.open(method, url, true)
      xhr.send()
    } else {
      xhr.open(method, url, true)
      xhr.send(data)
    }
  })
}
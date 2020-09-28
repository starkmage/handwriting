// 1. 创建实例
let xhr = new XMLHttpRequest
// 2. 初始化
// method为请求方法，true 表示异步
xhr.open(method, url, true)
// 3. 发送请求
xhr.send()
// 4. 执行回调
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
  }
}
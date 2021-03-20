// 假设 Toast 为我们封装好的组件
import Toast from ''

const obj = {}

/*
安装 Vue.js 插件。
如果插件是一个对象，必须提供 install 方法。
如果插件是一个函数，它会被作为 install 方法。
install 方法调用时，会将 Vue 作为参数传入。
*/
obj.install = Vue => {
  // 1. 创建组件容器
  const constructor = Vue.extend(Toast)
  // 2. 生成组件实例
  const toast = new constructor()
  // 3. 创建一个div元素并将toast挂载上去
  toast.$mount(document.createElement('div'))
  // 4. 添加这个div元素
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj

// main.js

import obj from ''
// Vue.use()主要是调用插件内部的install方法
Vue.use(obj)
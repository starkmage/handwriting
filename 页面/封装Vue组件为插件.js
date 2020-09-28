// 假设 Toast 为我们封装好的组件
const Toast = {}

const obj = {}

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

Vue.use(toast)
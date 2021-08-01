//首先数据劫持，为所有属性添加 getter 和 setter
function observe(obj) {
  if (!obj || typeof obj !== 'object') return
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

//监听set和get
function defineReactive(obj, key, value) {
  //递归子属性
  observe(value)
  //每个属性对应一个订阅者
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get--value被使用了')
      //将 watcher 添加到订阅者
      //一个 订阅者Dep 对应多个 观察者watcher
      if (Dep.target) dep.addSubs(Dep.target)
      console.log(dep.subs);
      return value
    },
    set: function reactiveSetter(newValue) {
      console.log('set-value被使用了')
      value = newValue
      //执行 watcher 的 update
      //订阅者通知它里面所有的观察者
      dep.notify() 
    }
  })
}

//收集依赖，订阅者
class Dep {
  constructor() {
    this.subs = []
  }
  //添加依赖
  addSubs(sub) {
    this.subs.push(sub)
  }
  //更新
  notify() {
    this.subs.forEach(sub => {
      sub.upDate()
    })
  }
}
// Dep 的静态属性
Dep.target = null

//观察者
class Watcher {
  constructor(obj, key, callback) {
    Dep.target = this
    this.obj = obj
    this.key = key
    this.value = obj[key]
    this.callback = callback
    Dep.target = null
  }

  upDate() {
    //获取新值
    this.value = this.obj[this.key]
    //用最新值去更新DOM
    this.callback(this.value)
  }
}

const data = {name: '渣渣辉'}
observe(data)
function callback(value) {
  document.querySelector('div').innerText = value
}
//这是模拟 Vue 解析到 {{name}} 的操作
new Watcher(data, 'name', callback)
//更新页面内容
data.name = '成龙'


/* 大概总结一些整个响应式系统的流程，也是我们常说的观察者模式：
第一步当然是通过 observer 进行数据劫持，
Vue 中初始化渲染时，视图上绑定的数据会实例化一个 观察者watcher，每一个 组件实例 都有且只有一个与之对应的 Watcher 实例（更准确的说是 render-watcher )
watcher 通过取值操作触发指定属性的 getter 方法，从而将 观察者watcher 添加进 Dep （利用了闭包的特性，进行依赖收集），
然后在 Setter 触发的时候，Dep 进行 notify，通知给所有观察者进行相应的 update */
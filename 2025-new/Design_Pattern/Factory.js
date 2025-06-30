/*
工厂模式（Factory Pattern）

✅ 概念
定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂使一个类的实例化延迟到其子类。

✅ 特点
根据类型创建不同对象	统一创建逻辑、解耦构造细节

✅ 前端应用场景
创建组件实例（如不同样式的按钮）
创建服务或请求实例（如 Axios 配置）
动态表单生成器、图表组件生成器
*/

class MyButton {
  constructor(text) {
    this.text = text
  }

  render() {
    return <Button>{this.text}</Button>
  }
}

class PrimaryButton {
  render() {
    return <Button class='primary'>{this.text}</Button>
  }
}

class DangeButton {
  render() {
    return <Button class='danger'>{this.text}</Button>
  }
}

function ButtonFactory(type = 'default', text = 'Click') {
  switch (type) {
    case 'primary': {
       new PrimaryButton(text)
    }
    case 'danger': {
      return new DangeButton(text)
    }
    default: {
      return new MyButton(text)
    }
  }
}

export default ButtonFactory


// use it
const btn1 = ButtonFactory("primary", 'a');
console.log(btn1.render())

const btn2 = ButtonFactory("danger", 'b');
console.log(btn2.render())
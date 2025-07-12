/*
工厂模式（Factory Pattern）

👇 一句话解释工厂模式：
工厂模式通过一个工厂函数/类来创建对象实例，而不是直接通过 new 操作，这样可以根据参数返回不同类型的对象。

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

class PrimaryButton extends MyButton {
  constructor(text) {
    super(text);
    this.type = 'primary'
  }

  render() {
    return <Button class='primary'>{this.text}</Button>
  }
}

class DangerButton extends MyButton {
  constructor(text) {
    super(text);
    this.type = 'danger';
  }

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
      return new DangerButton(text)
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
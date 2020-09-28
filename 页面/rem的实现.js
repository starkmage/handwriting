function setRem() {
  // 获取html元素
  let htmlEle = document.documentElement
  // 获取html元素宽度
  let width = htmlEle.getBoundingClientRect().width
  let rem = width / 75
  htmlEle.style.fontSize = rem + 'px'
}

addEventListener(resize, setRem)
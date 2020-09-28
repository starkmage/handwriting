//首先html的img标签设置一个无关的属性比如说data，加载到的时候再替换成src
//思路就是到视口区了再替换过去加载

let imgs = document.querySelectorAll('img')
// 页面可视区域的大小
let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
function myLazyLoad() {
  // 已经滚过去的高度
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  for (let img of imgs) {
    // 图片顶部在可视区域的高度
    let x = scrollTop + clientHeight - img.offsetTop
    if (x > 0 && x < clientHeight + img.height) {
      // getAttribute() 返回元素上一个指定的属性值
      img.src = img.getAttribute('data')
    }
  }
}

// 使用
window.addEventListener('scroll', myLazyLoad)
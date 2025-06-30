// 存储每个 effect 的状态
const effects = []
// 当前执行到第几个 useEffect
let hookIndex = 0

function useMyEffect(callback, deps) {
  const currentIndex = hookIndex

  const prevEffect = effects[currentIndex]

  let hasChanged = true

  if (prevEffect) {
    const [prevDeps] = prevEffect
    // deps是空数组时会执行得到false
    hasChanged = deps ? deps?.some((dep, i) => !Object.is(dep, prevDeps[i])) : true
  }

  if (hasChanged) {
     // 执行清理函数（如果存在）
    if (prevEffect && typeof prevEffect[1] === 'function') {
      prevEffect[1]()
    }

    // 执行新的 effect
    const cleanup = callback()
    effects[currentIndex] = [deps, cleanup]
  }

  hookIndex++
}

/* 
模拟每次 render 前都重置 hookIndex
非常关键，hookIndex = 0 是每轮 render 必须做的第一步！
这是 React 内部也在做的事情，
只不过它不叫 hookIndex，而是通过 Fiber 节点保存每个 hook 的指针顺序。
*/
function simulateRender(componentFn) {
  hookIndex = 0;
  componentFn();
}
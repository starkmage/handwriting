import { useEffect, useRef } from "react"

/*
useUpdateEffect 是一个 自定义 Hook，不是 React 官方内置的 API
跳过首次渲染，只在依赖变化时执行副作用
*/

const useUpdateEffect = (effect, deps) => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    return effect()
  },deps)
}

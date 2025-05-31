import { useState, useCallback, useRef, useEffect } from "react"

/*
适用场景：
  函数类型签名​​
当需要定义一个函数类型（尤其是包含复杂参数或返回值）时，type 通常是更自然的选择。函数类型更侧重于"形状"（shape）而非"扩展性"。
  联合类型或工具类型​​
如果未来可能需要组合其他类型（如 A | B），type 更灵活。
优势：
简洁直观地描述函数结构
适合一次性使用的类型定义
*/
type RequestFunction<T> = (...args: any[]) => Promise<T>

/*
适用场景：
  对象结构​​
当定义的是一个对象的结构（如配置选项、组件 Props 等）时，interface 更符合语义。
  可扩展性​​
如果未来可能需要通过声明合并（declaration merging）扩展类型（例如在第三方库中允许用户扩展默认配置类型），interface 是唯一选择。
优势：
更清晰的扩展性（可通过 extends 继承或同名接口合并）
更好的错误提示（IDE 通常会显示 interface 名称而非完整的类型结构）
*/
interface UseRequestOptions {
  manual?: boolean
}

interface UseRequestResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
  run: RequestFunction<T>
  cancel: () => void
}

const useRequest = <T>(
  requestFn: RequestFunction<T>,
  options: UseRequestOptions = {},
): UseRequestResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const { manual = false } = options

  const abortControllerRef = useRef(null)

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
      setLoading(false)
    }
  }, [abortControllerRef.current])


  const run = useCallback(async (...args) => {
    cancel()
    setLoading(true)
    setError(null)


    try {
      const abortController = new AbortController()
      abortControllerRef.current = abortController

      const result = await requestFn(...args, { signal: abortController.signal })
      setData(result)
      return result
    } catch (err) {
      // 如果是取消请求的错误，不设置错误状态
      if (err.name !== 'AbortError') {
        setError(err);
      }
      setError(err)
    } finally {
      abortControllerRef.current = null
      setLoading(false)
    }
  }, [cancel, requestFn])

  useEffect(() => {
    if (!manual) {
      run()
    }

    return () => {
      cancel()
    }
  }, [manual, run, cancel])


  return {
    data,
    loading,
    error,
    run,
    cancel
  }
}

export default useRequest
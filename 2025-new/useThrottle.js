import { useCallback, useRef } from "react"

const useThrottle = (callback, delay) => {
  const lastTimeRef = useRef(0)

  const throttledCallback = useCallback((...args) => {
    if (Date.now() - lastTimeRef.current < delay) {
      return
    }

    callback(...args)
    lastTimeRef.current = Date.now()
  }, [callback, delay])

  return throttledCallback
}
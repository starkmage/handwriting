import { useCallback, useEffect, useRef, useState } from "react"

const useThrottleCallback = (callback, delay) => {
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

const useThrottleValue = (value, delay) => {
  const [throttledValue, setThrottledValue] = useState(value)
  let lastTimeRef = useRef(0)
  let timerRef = useRef(null)

  useEffect(() => {
    if (Date.now() - lastTimeRef.current >= delay) {
      setThrottledValue(value)
      lastTimeRef.current = Date.now()
    } else {
      timerRef.current = setTimeout(() => {
        setThrottledValue(value)
        lastTimeRef.current = Date.now()
      }, delay);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [value, delay])

  return throttledValue
}
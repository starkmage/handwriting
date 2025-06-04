import { useState, useRef, useEffect } from 'react'

interface UseDebounce<T> {
  value: T
  delay: number
}

const useDebounce = <T>(props: UseDebounce<T>): T => {
  const { value, delay } = props
  const [debouncedValue, setDebouncedValue] = useState(value)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [value])

  return debouncedValue
}

export default useDebounce
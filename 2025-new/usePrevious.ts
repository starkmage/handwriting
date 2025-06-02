import { useEffect, useRef } from 'react';

const usePrevious = <T>(value: T): T => {
  const previousValueRef = useRef()

  useEffect(() => {
    previousValueRef.current = value
  }, [value])

  return previousValueRef.current
}

export default usePrevious
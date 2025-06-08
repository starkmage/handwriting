import React, { useCallback, useState, useMemo, useRef, useEffect } from "react";

const VirtualScrollList = ({
  data = [],
  containerHeight = 500,
  itemHeight = 10,
  renderItem = (item) => item,
  bufferSize = 2
}) => {
  const [scrollTop, setScrollTop] = useState(0)

  const startIndex = useMemo(() => {
    return Math.max(Math.floor(scrollTop / itemHeight) - bufferSize, 0)
  }, [scrollTop, itemHeight, bufferSize])

  const endIndex = useMemo(() => {
    return Math.min(startIndex + Math.ceil(containerHeight / itemHeight) + bufferSize, data.length - 1)
  }, [startIndex, containerHeight, itemHeight, bufferSize, data.length])

  const visibleItems = useMemo(() => {
    return data.slice(startIndex, endIndex + 1)
  }, [startIndex, endIndex, data])


  const scrollAnimationFrame = useRef(null)
  const containerRef = useRef(null)

  const handleScroll = useCallback(() => {
    if (scrollAnimationFrame.current) {
      cancelAnimationFrame(scrollAnimationFrame.current);
    }

    scrollAnimationFrame.current = requestAnimationFrame(() => {
      setScrollTop(containerRef?.current?.scrollTop);
    })
  }, [])

  useEffect(() => {
    return () => {
      if (scrollAnimationFrame.current) {
        cancelAnimationFrame(scrollAnimationFrame.current);
      }
    }
  }, [])

  return (
    <div
      style={{
        height: `${containerHeight}px`,
        overflow: 'auto',
      }}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: `${data.length * itemHeight}px`,
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: `${startIndex * itemHeight}px`
          }}
        >
          {
            visibleItems.map((item, index) => {
              return (
                <div
                  key={startIndex + index}
                  style={{
                    height: `${itemHeight}px`,
                  }}
                >
                  {renderItem(item)}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default VirtualScrollList
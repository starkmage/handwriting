// 力扣2805

const map = new Map()

/**
 * @param {Function} fn
 * @param {number} delay
 * @param {number} period
 * @return {number} id
 */
function customInterval(fn, delay, period) {
  const id = Date.now()
  let count = 0

  const attempt = () => {
    const timer = setTimeout(() => {
      fn()
      count++
      attempt()
    }, delay + period * count)

    map.set(id, timer)
  }

  attempt()

  return id
}

/**
 * @param {number} id
 * @return {void}
 */
function customClearInterval(id) {
  if (map.has(id)) {
    const timer = map.get(id)
    clearTimeout(timer)
  }
}
let executeCount = 0
const targetFn = async (nums) => {
  executeCount++

  return nums.map((n) => 2 * n + 1)
}

// I need to complete
const batcher = (fn) => {
  // todo
  const callbackList = []
  const argsList = []
  let timer = null

  return (array) => {
    return new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer)
      }

      callbackList.push({
        callback: resolve,
        startIndex: argsList.length,
        endIndex: argsList.length + array.length - 1
      })
      argsList.push(...array)

      timer = setTimeout(async () => {
        const result = await fn(argsList)

        for (const item of callbackList) {
          const { callback, startIndex, endIndex } = item

          const values = result.slice(startIndex, endIndex + 1)

          callback(values)
        }
      })
    })
  }
}

const batchedFn = batcher(targetFn)

const main = async () => {
  const [result1, result2, result3] = await Promise.all([
    batchedFn([1, 2, 3]),
    batchedFn([4, 5]),
    batchedFn([6, 7])
  ])

  // expected: 1
  console.log(executeCount)

  console.log({ result1, result2, result3 })
}

main()
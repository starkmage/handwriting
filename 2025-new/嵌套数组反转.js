/* 
嵌套数组反转

期望输出：
[5, [4, [3, [2, 1]]]]
*/

const input = [1, [2, [3, [4, 5]]]]

const reverse = (nums) => {
  const loop = (cur, pre) => {
    if (!Array.isArray(cur)) {
      return pre.length > 0 ? [cur, pre] : [cur]
    }

    if (cur.length === 0) {
      return pre
    }

    const [value, next] = cur

    return loop(
      next,
      [
        value,
        ...(
          pre.length > 0 ? (pre[0] === nums[0] ? pre : [pre]) : []
        )
      ]
    )
  }

  return loop(nums, [])
}

const output = reverse(input)
console.log(JSON.stringify(output))
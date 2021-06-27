function mergeSort(arr) {
  const len = arr.length
  if (len <= 1) return arr
  const mid = Math.floor(len / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}

function merge(left, right) {
  const res = []
  let i = 0, j = 0
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      res.push(left[i])
      i++
    } else {
      res.push(right[j])
      j++
    }
  }
  if (i < left.length) {
    res.push(...left.slice(i))
  }
  if (j < right.length) {
    res.push(...right.slice(j))
  }
  return res
}

let a = [3, 2, 1, 4, 9, 2, 1, 13]

let b = mergeSort(a)

console.log(b);
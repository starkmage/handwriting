function mergeSort(array) {
  let res = mergeSortSplit(array)
  for (let i in array) {
    array[i] = res[i]
  }
}

function mergeSortSplit(array) {
  if (array.length <= 1) return array
  let center = Math.floor(array.length / 2)
  let left = mergeSortSplit(array.slice(0, center))
  let right = mergeSortSplit(array.slice(center, array.length))
  return mergeSortMerge(left, right)
}

function mergeSortMerge(left, right) {
  let res = []
  while (left.length && right.length) {
    left[0] <= right[0] ? res.push(left.shift()) : res.push(right.shift())
  }
  if (left.length) res.push(...left)
  if (right.length) res.push(...right)
  return res
}

let a = [3, 2, 1, 4, 9, 2, 1, 13]

mergeSort(a)

let b = [7, 6, 8, 5, 4, 3, 2, 1]

mergeSort(b)

console.log(a);

console.log(b);
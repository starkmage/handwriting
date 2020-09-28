//基础版
function quickSort(array, left, right) {
  if (left >= right) return
  let start = left
  let end = right
  let temp = array[left]
  while (left < right) {
    while(left < right && array[right] >= temp) {
      right--
    }
    array[left] = array[right]
    while (left < right && array[left] <= temp) {
      left++
    }
    array[right] = array[left]
  }

  array[left] = temp

  quickSort(array, start, left - 1)
  quickSort(array, left + 1, end)
}

let a = [3, 2, 1, 4, 9, 2, 1, 13]

quickSort(a, 0, a.length - 1)

console.log(a);
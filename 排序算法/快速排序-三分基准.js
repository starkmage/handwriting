function swap(i, j, array) {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

function quickSort(array, left, right) {
  if (left >= right) return

  //1.三分基准选择
  let center = Math.floor((left + right) / 2)
  if (array[left] > array[center]) {
    swap(left, center, array)
  }
  if (array[center] > array[right]) {
    swap(center, right, array)
  }
  if (array[left] > array[center]) {
    swap(left, center, array)
  }

  swap(left, center, array)

  //2.快速排序
  let temp = array[left]
  let start = left
  let end = right
  while (left < right) {
    while (left < right && array[right] >= temp) right--
    array[left] = array[right]
    while (left < right && array[left] <= temp) left++
    array[right] = array[left]
  }
  array[left] = temp

  //3.递归
  quickSort(array, start, left - 1)
  quickSort(array, left + 1, end)
}

let a = [3, 2, 1, 4, 9, 2, 1, 13]

quickSort(a, 0, a.length - 1)

let b = [7, 6, 8, 5, 4, 3, 2, 1]

quickSort(b, 0, b.length - 1)

console.log(a);

console.log(b);

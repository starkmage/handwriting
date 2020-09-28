function insertSort(array) {
  for (let i = 1; i < array.length; i++) {
    let temp = array[i]
    let j = i - 1
    while (j >= 0 && array[j] > temp) {
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = temp
  }
}

let a = [3, 2, 1, 4, 9, 2, 1, 13]

insertSort(a)

console.log(a);
function shellSort(array) {
  let len = array.length
  let gap = Math.floor(len / 2)
  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      let temp = array[i]
      let j = i - gap
      while (j >= 0 && array[j] > temp) {
        array[j + gap] = array[j]
        j = j - gap
      }
      array[j + gap] = temp
    }
    gap = Math.floor(gap / 2)
  }
}

let a = [3, 2, 1, 4, 9, 2, 1, 13]

shellSort(a)

console.log(a);
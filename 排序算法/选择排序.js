function swap(i, j, array) {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

function selectSort(array) {
  for (let i = 0; i < array.length; i++) {
    let min = i
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) min = j
    }
    swap(i, min, array)
  }
}


let a = [3, 2, 1, 4, 9, 2]

selectSort(a)

console.log(a);
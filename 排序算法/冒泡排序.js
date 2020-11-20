function swap(i, j, array) {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

function buddleSort(array) {
  let len = array.length
  for (let i = len - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) swap(j, j + 1, array)
    }
  }
}


// 改进冒泡排序
function bubbleSort1(arr) {
  let i = arr.length - 1;
  while (i > 0) {
      let pos = 0;
      for (let j = 0; j < i; j++) {
          if (arr[j] > arr[j + 1]) {
              pos = j;
              const temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
          }
      }
      i = pos;
  }
  console.log(arr);
}

let a = [3, 2, 1, 4, 9, 2]

buddleSort(a)

console.log(a);


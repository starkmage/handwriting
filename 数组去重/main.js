//1. 双重for循环，时间复杂度为O(n^2)
function distinct1(array) {
  let len = array.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (array[j] === array[i]) {
        array.splice(j, 1)
        //数组长度变了
        len--
        j--
      }
    }
  }
}


//2. filter + indexOf，时间复杂度为O(n^2)
function distinct2(array) {
  return array.filter((value, index) => array.indexOf(value) === index)
}

//3. for...of + includes，时间复杂度为O(n^2)
function distinct3(array) {
  let res = []
  for (let value of array) {
    if (!res.includes(value)) {
      res.push(value)
    }
  }
  return res
}

//4. for...of 和 map，时间复杂度为O(n)
function distinct4(array) {
  let res = []
  let map = {}
  for (let value of array) {
    if (!map[value]) {
      res.push(value)
      map[value] = 1
    }
  }
  return res
}

//5. 先排序，时间复杂度为 O(nlog(n))
function distinct5(array) {
  if (array.length === 0) return []
  array.sort((a, b) => a - b)
  let res = [array[0]]
  for (let i = 1; i < array.length; i++) {
    if (array[i] !== array[i - 1]) res.push(array[i])
  }
  return res
}

//6. new Set
function distinct6(array) {
  return [...(new Set(array))]
}

let a = [1, 2, 5, 2, 1, 6]

let res= distinct6(a)

console.log(res);

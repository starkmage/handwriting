// 简化的实现逻辑
Array.prototype[Symbol.myIterator] = function () {
  let index = 0;
  const array = this;

  return {
    next() {
      return index < array.length
        ? { value: array[index++], done: false }
        : { value: undefined, done: true };
    }
  };
};


const arr = [1, 2, 3];

// for...of 循环
for (const item of arr) {
  console.log(item);
}

// 等价于以下手动迭代过程
const iterator = arr[Symbol.myIterator]();
let result = iterator.next();

while (!result.done) {
  const item = result.value;
  console.log(item);
  result = iterator.next();
}

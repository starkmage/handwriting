// 简化的实现逻辑
// 不用Generator实现的
Array.prototype[Symbol.iterator] = function () {
  let index = 0;
  const array = this;

  return {
    next() {
      if (index < array.length) {
        return { value: array[index++] * 10, done: false }
      } else {
        return { value: undefined, done: true };
      }
    }
  };
};

// 用Generator实现的
Array.prototype[Symbol.iterator] = function* () {
  const array = this
  for (let i = 0; i < array.length; i++) {
    yield array[i] * -1
  }
};


const arr = [1, 2, 3];

// for...of 循环
for (const item of arr) {
  console.log(item);
}

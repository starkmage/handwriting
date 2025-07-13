/*
参考：
https://yuanbao.tencent.com/chat/naQivTmsDa/b63b2d60-59bd-47d9-b62e-11fe6dd4b971?projectId=2f13020843e3426ab5f1fc84dfe2aa87

spawn 函数实际上模拟了 async/await 的运行机制
*/
// async/await 版本
async function foo() {
  const a = await somePromise();
  const b = await anotherPromise();
  return a + b;
}

// 对应的 Generator 实现
function foo() {
  return spawn(function*() {
    const a = yield Promise.resolve('abc')
    const b = yield Promise.resolve('def')
    return a + b;
  });
}

function spawn(generatorFn) {
  return new Promise((resolve, reject) => {
    const generator = generatorFn()

    function step(nextFn) {
      let next
      try {
        next = nextFn()
      } catch(err) {
        return reject(err)
      }

      if (next.done) {
        return resolve(next.value)
      }

      Promise.resolve(next.value).then(
        value => step(() => generator.next(value)),
        error => step(() => generator.throw(error))
      )
    }

    step(() => generator.next())
  })
}

const res = foo().then(console.log)
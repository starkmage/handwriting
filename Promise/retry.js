// 示例
let count = 0;
retry(() => {
  return new Promise((resolve, reject) => {
    count++;
    count < 3 ? reject('fail') : resolve('success');
  });
}, 3).then(console.log).catch(console.log)


function retry(promiseFn, times) {
  return new Promise((resolve, reject) => {
    const attempt = () => {
      promiseFn().then(resolve).catch(err => {
        times--
        if (times <= 0) {
          reject(err)
        } else {
          attempt()
        }
      })
    }

    attempt()
  })
}
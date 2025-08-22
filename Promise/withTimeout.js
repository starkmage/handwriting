// 力扣2637
// 示例
const delayedPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
});

withTimeout(delayedPromise, 500)
  .then(() => console.log('done'))
  .catch(err => console.log(err)); // 'Timeout'


function withTimeout(promise, timeout) {
  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Timeout')
      }, timeout)
    })
  ])
}
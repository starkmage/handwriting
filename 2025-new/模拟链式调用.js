// 示例
const a = task().sleep(1000).eat('apple').sleep(500).eat('banana');
const b = a.sleep(500).eat('watermelon');

function task() {
  const queue = []

  const run = async () => {
    for (const fn of queue) {
      await fn()
    }
  }

  const api = {
    sleep(ms) {
      queue.push(() => new Promise(resolve => setTimeout(resolve, ms)))
      return api
    },
    eat(food) {
      queue.push(() => {
        console.log(`Eat ${food}`);
        return Promise.resolve()
      })

      return api
    }
  }

  setTimeout(run, 0)

  return api
}

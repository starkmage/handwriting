class Scheduler {
  constructor() {
    this.queue = []
    this.limit = 2
    this.running = 0
  }
  request() {
    if (!this.queue.length) {
      return
    }
    const job = this.queue.shift()
    this.run(job)
  }

  run(job) {
    this.running++
    job().then(() => {
      this.running--
      this.request()
    })
  }

  add(promiseCreator) {
    if (this.running >= this.limit) {
      this.queue.push(promiseCreator)
    } else {
      this.run(promiseCreator)
    }
  }
}
   
const timeout = time => new Promise(resolve => {
  setTimeout(resolve, time);
})
  
const scheduler = new Scheduler();
  
const addTask = (time,order) => {
  scheduler.add(() => timeout(time).then(()=>console.log(order)))
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

// output: 2 3 1 4
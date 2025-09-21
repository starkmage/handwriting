// 力扣2721
Promise.all = (promises) => {
  if (!Array.isArray(promises)) {
    throw new Error('params must be an array')
  }

  if (promises.length === 0) {
    return Promise.resolve([])
  }

  return new Promise((resolve, reject) => {
    const results = []
    let completed = 0
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          completed++
          results[index] = value
          if (completed === promises.length) {
            resolve(results)
          }
        },
        reason => {
          reject(reason)
        }
      )
    })
  })
}

Promise.race = (promises) => {
  if (!Array.isArray(promises)) {
    throw new Error('params must be an array')
  }

  if (promises.length === 0) {
    // 返回一个永远 pending 的 Promise
    return new Promise(() => { })
  }

  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(
        resolve,
        reject
      )
    })
  })
}

// 力扣2795
Promise.allSettled = (promises) => {
  if (!Array.isArray(promises)) {
    throw new Error('params must be an array')
  }

  if (promises.length === 0) {
    return Promise.resolve([])
  }

  return new Promise((resolve) => {
    const results = []
    let completed = 0
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          results[index] = {
            status: 'fulfilled',
            value,
          }
          completed++
          if (completed === promises.length) {
            resolve(results)
          }
        },
        reason => {
          results[index] = {
            status: 'rejected',
            reason,
          }
          completed++
          if (completed === promises.length) {
            resolve(results)
          }
        }
      )
    })
  })
}

Promise.any = (promises) => {
  if (!Array.isArray(promises)) {
    throw new Error('params must be an array')
  }

  if (promises.length === 0) {
    return Promise.reject(new AggregateError([], 'All promises were rejected'))
  }

  return new Promise((resolve, reject) => {
    const errors = []
    let rejected = 0

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          resolve(value)
        },
        reason => {
          errors[index] = reason
          rejected++
          if (rejected === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'))
          }
        }
      )
    })
  })
}

class MyPromise {
  constructor(executor) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach((callback) => {
          queueMicrotask(() => {
            callback(value);
          });
        });
      }
    }

    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach((callback) => {
          queueMicrotask(() => {
            callback(reason);
          });
        });
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  // ✅ 核心部分：实现 resolve
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    }

    return new MyPromise((resolve) => resolve(value))
  }

  // ✅ 核心部分：实现 reject
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason))
  }
}

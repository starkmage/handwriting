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
    return Promise.reject('Array is empty')
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
    throw new AggregateError([], 'Array is empty')
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
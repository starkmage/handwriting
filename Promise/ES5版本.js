const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function myPromise(excutor) {
  const _this = this
  _this.status = PENDING
  _this.data = undefined
  _this.callbacks = []
  
  try {
    excutor(resolve, reject)
  } catch(err) {
    reject(err)
  }

  function resolve(value) {
    if (_this.status !== PENDING) return
    _this.status = RESOLVED
    _this.data = value
    if (_this.callbacks.length > 0) {
      setTimeout(() => {
        _this.callbacks.forEach(callbackObj => {
          callbackObj.onResolved(value)
        })
      })
    }
  }

  function reject(reason) {
    if (_this.status !== PENDING) return
    _this.status = REJECTED
    _this.data = reason
    if (_this.callbacks.length > 0) {
      setTimeout(() => {
        _this.callbacks.forEach(callbackObj => {
          callbackObj.onRejected(reason)
        })
      })
    }
  }

}

myPromise.prototype.then = function(onResolved, onRejected) {
  onResolved = typeof onResolved === 'function' ? onResolved : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
  const _this = this
  return new myPromise((resolve, reject) => {
    if (_this.status === PENDING) {
      _this.callbacks.push({
        onResolved(value) {
          handle(onResolved)
        },
        onRejected(reason) {
          handle(onRejected)
        }
      })
    } else if (_this.status === RESOLVED) {
      setTimeout(() => {
        handle(onResolved)
      })
    } else {
      setTimeout(() => {
        handle(onRejected)
      })
    }

    function handle(callback) {
      try {
        const res = callback(_this.data)
        if (res instanceof myPromise) {
          res.then(value => resolve(value), reason => reject(reason))
        } else {
          resolve(res)
        }
      } catch(err) {
        reject(err)
      }
    }
  })
}

myPromise.prototype.catch = function(onRejected) {
  return this.then(undefined, onRejected)
}

myPromise.prototype.finally = function(callback) {
  this.then(value => {
    return myPromise.resolve(callback()).then(() => value)
  }, reason => {
    return myPromise.resolve(callback()).then(() => { throw reason })
  })
}


myPromise.resolve = function(value) {
  return new myPromise((resolve, reject) => {
    if (value instanceof myPromise) {
      value.then(resolve, reject)
    } else {
      resolve(value)
    }
  })
}

myPromise.reject = function(reason) {
  return new myPromise((resolve, reject) => {
    reject(reason)
  })
}

myPromise.all = function(promises) {
  const values = Array(promises.length)
  let successCount = 0
  return new myPromise((resolve, reject) => {
    promises.forEach((p, index) => {
      myPromise.resolve(p).then(
        value => {
          values[index] = value
          successCount++
          if (successCount === promises.length) resolve(values)
        },
        reason => {
          reject(reason)
        }
      )
    })
  })
}

myPromise.race = function(promises) {
  return new myPromise((resolve, reject) => {
    promises.forEach((p, index) => {
      myPromise.resolve(p).then(
        value => {
          resolve(value)
        },
        reason => {
          reject(reason)
        }
      )
    })
  })
}
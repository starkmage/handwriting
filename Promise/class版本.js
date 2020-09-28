const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class myPromise {
  constructor(executor) {
    const _this = this
    _this.status = PENDING
    _this.data = undefined
    _this.callbacks = []

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }

    function resolve(value) {
      if (_this.status !== PENDING) return
      _this.status = RESOLVED
      _this.data = value

      if (_this.callbacks.length !== 0) {
        setTimeout(() => {
          _this.callbacks.forEach(fn => {
            fn.onResolved(value)
          })
        }, 0)
      }
    }

    function reject(reason) {
      if (_this.status !== PENDING) return
      _this.status = REJECTED
      _this.data = reason

      if (_this.callbacks.length !== 0) {
        setTimeout(() => {
          _this.callbacks.forEach(fn => {
            fn.onRejected(reason)
          })
        }, 0)
      }
    }
  }

  then(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    const _this = this

    return new myPromise((resolve, reject) => {

      function handle(callback) {
        try {
          const res = callback(_this.data)
          if (res instanceof myPromise) {
            res.then(value => resolve(value), reason => reject(reason))
          } else {
            resolve(value)
          }
        } catch (err) {
          reject(err)
        }
      }

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
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }


  static resolve(value) {
    return new myPromise((resolve, reject) => {
      if (value instanceof myPromise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }

  static reject(reason) {
    return new myPromise((resolve, reject) => {
      reject(reason)
    })
  }

  static all(promises) {
    const values = Array(promises.length)
    let successCount = 0
    return new myPromise((resolve, reject) => {
      promises.forEach((p, index) => {
        myPromise.resolve(p).then(
          value => {
            successCount++
            values[index] = value
            if (successCount === promises.length) resolve(values)
          },
          reason => {
            reject(reason)
          }
        )
      })
    })
  }

  static race(promises) {
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
}
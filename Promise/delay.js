// 力扣2821

var delayAll = function(functions, ms) {
    const result = functions.map((fn) => {
      return () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fn().then(resolve, reject)
          }, ms)
        })
      }
    })

    return result
};
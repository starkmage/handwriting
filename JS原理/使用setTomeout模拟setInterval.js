setTimeout(function() {
  setTimeout(arguments.callee, 1000)
}, 1000)

//arguments.callee 是一个指针，指向拥有 arguments 的函数

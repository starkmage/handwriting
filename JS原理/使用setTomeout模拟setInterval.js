// 力扣2805

function customInterval(callback, delay) {
  let timerId;
  
  function execute() {
    callback();
    timerId = setTimeout(execute, delay); // 递归调用
  }
  
  timerId = setTimeout(execute, delay); // 首次调用
  
  return {
    clear: function() {
      clearTimeout(timerId);
    }
  };
}

// 使用示例
const interval = customInterval(() => {
  console.log('执行任务');
}, 1000);

// 5秒后清除定时器
setTimeout(() => {
  interval.clear();
}, 5000);
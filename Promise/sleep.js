const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

/* 
测试代码
*/
const fn = async() => {
  console.log('start')
  await sleep(3000)
  console.log('end');
}

fn()
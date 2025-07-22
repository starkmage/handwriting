class Onion {
  constructor() {
    this.middlewares = [];
    this.errorHandler = null;
  }

  use(fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be a function!');
    }
    this.middlewares.push(fn);

    return this;
  }

  catch(handler) {
    if (typeof handler !== 'function') {
      throw new TypeError('Error handler must be a function!');
    }
    this.errorHandler = handler;

    return this;
  }

  async execute(context) {
    if (!context) {
      context = {};
    }

    let index = -1;
    const middlewares = this.middlewares;
    const errorHandler = this.errorHandler;

    async function dispatch(i) {
      if (i <= index) {
        throw new Error('next() called multiple times');
      }

      index = i;
      let fn = middlewares[i];

      // 所有中间件执行完毕
      if (i === middlewares.length) {
        return;
      }

      try {
        await fn(context, () => dispatch(i + 1));
      } catch (err) {
        if (errorHandler) {
          await errorHandler(err, context);
        } else {
          throw err;
        }
      }
    }

    try {
      await dispatch(0);

      return context;
    } catch (err) {
      if (errorHandler) {
        await errorHandler(err, context);
        
        return context;
      }
      throw err;
    }
  }
}

/* 测试 */
// 创建洋葱实例
const onion = new Onion();

// 添加中间件
onion.use(async (ctx, next) => {
  console.log('Middleware 1 start');
  ctx.value1 = 'Hello';
  await next();
  console.log('Middleware 1 end');
});

onion.use(async (ctx, next) => {
  console.log('Middleware 2 start');
  ctx.value2 = 'World';
  await next();
  console.log('Middleware 2 end');
});

onion.use(async (ctx, next) => {
  console.log('Middleware 3 start');
  ctx.value3 = '!';
  // 不调用next()会终止后续中间件执行
  // await next();
  console.log('Middleware 3 end');
});

// 错误处理
onion.catch((err, ctx) => {
  console.error('Error occurred:', err.message);
  ctx.error = err.message;
});

// 执行中间件栈
(async () => {
  const ctx = {};
  await onion.execute(ctx);
  console.log('Final context:', ctx);
})();
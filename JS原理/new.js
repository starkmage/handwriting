function myNew(constructor, ...args) {
    // 1. 创建一个新对象，继承构造函数的原型
    const obj = Object.create(constructor.prototype);
    
    // 2. 执行构造函数，并将 this 绑定到新创建的对象
    const result = constructor.apply(obj, args);
    
    // 3. 如果构造函数返回了一个对象，则返回该对象
    //    否则返回新创建的对象
    return result instanceof Object ? result : obj;
}
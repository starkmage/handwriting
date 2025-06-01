function deepClone(obj, hashMap = new WeakMap()) {
	if (obj === null || typeof obj !== 'object') {
		return obj
	}

	if (obj instanceof Date) {
		return new Date(obj)
	}

	if (obj instanceof RegExp) {
		return new RegExp(obj)
	}

  // 考虑循环引用
	if (hashMap.get(obj)) {
		return hashMap.get(obj)
	}

	// 创建新对象，保持原型链
	const clonedObj = Array.isArray(obj)
		? []
		: Object.create(Object.getPrototypeOf(obj));

	hashMap.set(obj, clonedObj)
	
	for (const key of Object.keys(obj)) {
		clonedObj[key] = deepClone(obj[key], hashMap)
	}

	return clonedObj
}


let obj = {
  a: 'asd',
  b: 'ssasd'
}

let o = deepClone(obj)

console.log(o);
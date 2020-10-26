const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

/*export function isObject(val: any): val is Object {
	return val !== null && typeof val === 'object'
}*/

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    // 以+、-、/、()、[]这些字符开头的语句都需要加分号,因为代码压缩合并后非常容易混淆出错
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// 参数有两个val1和val2，有可能只传一个val1参数
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            // 这是如果val1拷贝之后，对象值有了。还需要跟val2的值重新深拷贝一次
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}

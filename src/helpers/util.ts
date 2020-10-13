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

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    // 以+、-、/、()、[]这些字符开头的语句都需要加分号,因为代码压缩合并后非常容易混淆出错
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

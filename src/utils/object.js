/**
 * 对象拷贝
 * @param {Object} to
 * @param {Object} _from
 */
export function extend (to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
/**
 * 是Promise对象
 * @param {Promise} p
 */
export function isPromise (p) {
  return p && typeof p.then === 'function'
}
// 判断参数是否是其中之一
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

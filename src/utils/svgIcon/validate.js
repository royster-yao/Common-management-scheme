/**
 * 判断是的为外部资源
 * @param {*} path
 */

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

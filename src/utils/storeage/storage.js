/**
 * 储存数据
 */
export const setItem = (key, value) => {
  // value 分为两种情况
  // 1.基本数据类型
  // 1.复杂数据类型
  if (typeof value === "object") {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = (key) => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
/**
 * 删除指定数据
 */
export const removeItem = (key) => {
  localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const removeAllItem = () => {
  localStorage.clear()
}

import { getItem, setItem } from "@/utils/storeage/storage"
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from "@/constant"
/**
 * 获取时间戳名
 * @params {*} TIME_STAMP = timeStamp
 */
export function getTimeStamp() {
  return getItem(TIME_STAMP)
}
/**
 * 设置时间戳 {'timeStamp','Date.now()'}
 */
export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}

/**
 * 判断是否超时
 */
export function isCheckTimeOut() {
  // 获取当前时间
  const currentTime = Date.now()
  // 缓存时间
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}

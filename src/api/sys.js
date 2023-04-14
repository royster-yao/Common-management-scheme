import request from "@/utils/api/request"
/**
 * 登录
 *  return Promise
 */

export const login = (data) => {
  return request({
    url: "/sys/login",
    method: "POST",
    data,
  })
}

export const getUserInfo = () => {
  return request({
    url: "/sys/profile",
  })
}

import request from "@/utils/api/request"

/**
 * 获取所有权限
 * @returns {data 所有权限数据}
 */
export const permissionList = () => {
  return request({
    url: "/permission/list",
  })
}

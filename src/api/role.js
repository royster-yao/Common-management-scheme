import request from "@/utils/api/request"

/**
 * 获取所有角色
 * @returns {data 所有角色数据}
 */
export const roleList = () => {
  return request({
    url: "/role/list",
  })
}

/**
 * 获取当前角色对应的权限
 * @param {*} roleId
 * @returns
 */
export const rolePermission = (roleId) => {
  return request({
    url: `/role/permission/${roleId}`,
  })
}
/**
 * 为角色修改权限
 * @param {*} data
 * @returns
 */
export const distributePermission = (data) => {
  return request({
    url: "role/distribute-permission",
    method: "POST",
    data,
  })
}

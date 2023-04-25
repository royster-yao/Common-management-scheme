import request from "@/utils/api/request"

/**
 * 获取用户列表数据
 * @param {*} data
 * @returns
 */
export const getUserManageList = (data) => {
  return request({
    url: "/user-manage/list",
    params: data,
  })
}
/**
 * 获取所有用户数据列表
 * @param {*} data
 * @returns
 */
export const getUserManageAllList = () => {
  return request({
    url: "/user-manage/all-list",
  })
}
/**
 * 批量上传
 * @param {*} data
 * @returns
 */
export const userBatchImport = (data) => {
  return request({
    url: "/user-manage/batch/import",
    method: "POST",
    data,
  })
}
/**
 * 删除指定用户
 * @param {*} id
 * @returns
 */
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/detele/${id}`,
  })
}

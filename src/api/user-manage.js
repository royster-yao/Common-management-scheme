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

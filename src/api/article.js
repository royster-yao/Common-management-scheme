import request from "@/utils/api/request"

/**
 * 获取所有文章
 * @returns
 */
export const getArticleList = (data) => {
  return request({
    url: "/article/list",
    params: data,
  })
}

/**
 * 修改排序
 * @param {*} data
 * @returns
 */
export const articleSort = (data) => {
  return request({
    url: "/article/sort",
    method: "POST",
    data,
  })
}

/**
 * 删除文章
 * @param {*} articleId
 * @returns
 */
export const deleteArticle = (articleId) => {
  return request({
    url: `/article/delete/${articleId}`,
  })
}

/**
 * 文章详情
 * @param {*} articleId
 * @returns
 */
export const articleDetail = (articleId) => {
  return request({
    url: `/article/${articleId}`,
  })
}

/**
 * 创建文章
 * @param {*} data
 * @returns
 */
export const createAticle = (data) => {
  return request({
    url: "/article/create",
    method: "POST",
    data,
  })
}

/**
 * 编辑文章
 * @param {*} data
 * @returns
 */
export const editorAticle = (data) => {
  return request({
    url: "/article/edit",
    method: "POST",
    data,
  })
}

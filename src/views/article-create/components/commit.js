import { createAticle, editorAticle } from "@/api/article"
import { ElMessage } from "element-plus"
import i18n from "@/i18n/index"

const t = i18n.global.t
/**
 * 创建文章提交
 * @param {*} data
 * @returns
 */
export const commitArticle = async (data) => {
  const res = await createAticle(data)
  ElMessage.success(t("msg.article.createSuccess"))
  return res
}
/**
 * 编辑文章提交
 * @param {*} data
 * @returns
 */
export const editArticle = async (data) => {
  const res = await editorAticle(data)
  ElMessage.success(t("msg.article.editorSuccess"))
  return res
}

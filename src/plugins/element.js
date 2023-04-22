import ElementPlus from "element-plus"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import en from "element-plus/dist/locale/en.mjs"
import store from "@/store"

export default (app) => {
  app.use(ElementPlus, {
    locale: store.getters.language === "en" ? en : zhCn,
  })
}

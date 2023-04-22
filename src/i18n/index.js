import { createI18n } from "vue-i18n"
import zhLocale from "./lang/zh"
import enLocale from "./lang/en"
import store from "@/store"

const messages = {
  en: {
    msg: {
      ...enLocale,
    },
  },
  zh: {
    msg: {
      ...zhLocale,
    },
  },
}

function getLanguage() {
  return store && store.getters && store.getters.language
}

const i18n = createI18n({
  // 使用composition Api
  legacy: false,
  // 全局使用 t 函数
  globalInjection: true,
  locale: getLanguage(),
  messages,
})

export default i18n

import i18n from "@/i18n"
import { watch } from "vue"
import store from "@/store/index"

export function generateTitle(title) {
  return i18n.global.t("msg.route." + title)
}

/**
 * 监听语言变化,同时执行 cb
 * @param  {...any} cbs
 */
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}

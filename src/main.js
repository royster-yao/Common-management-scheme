import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
// 导入初始化样式
import "@/styles/index.scss"
// 导入svgIcon
import installIcons from "@/icons/index"
import i18n from "@/i18n"
import installElementLang from "./plugins/element.js"
// 导入路由鉴权
import "./permission"
// 全局属性
import installFilter from "@/filters/index"

// 解决ResizeObserver loop limit exceeded 报错的问题
const debounce = (fn, delay) => {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

const _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16)
    super(callback)
  }
}
const app = createApp(App)
installElementLang(app)
installIcons(app)
installFilter(app)
app.use(store).use(router).use(i18n).mount("#app")

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
import "@/err/index"
// 解决ResizeObserver loop limit exceeded 报错的问题
import installFilter from "@/filters/index"
import insatllDirective from "@/directives/index"

const app = createApp(App)
installElementLang(app)
installIcons(app)
installFilter(app)
insatllDirective(app)
app.use(store).use(router).use(i18n).mount("#app")

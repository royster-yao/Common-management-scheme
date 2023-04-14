import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
// 导入初始化样式
import "@/styles/index.scss"
// 导入svgIcon
import installIcons from "@/icons/index"

// 导入路由鉴权
import "./permission"

const app = createApp(App)
installIcons(app)
app.use(store).use(router).mount("#app")

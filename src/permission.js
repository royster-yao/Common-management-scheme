import router from "@/router"
import store from "@/store"

// 白名单
const whiteList = ["/login"]

router.beforeEach(
  /**
   * 路由前置守卫
   * @param {*} to  需要跳转的路由
   * @param {*} from 从哪个路由来
   * @param {*} next  是否放行
   */

  async (to, from, next) => {
    if (store.getters.token) {
      // 1. 用户已登录，则不允许进入 login
      if (to.path === "/login") {
        next("/")
      } else {
        // 判断用户资料是否存在,如果不存在，则获取用户信息
        if (!store.getters.hashUserInfo) {
          await store.dispatch("user/getUserInfo")
        }
        next()
      }
    } else {
      // 2. 用户未登录,则只允许进入login
      if (whiteList.indexOf(to.path) > -1) {
        next()
      } else {
        next("/login")
      }
    }
  }
)

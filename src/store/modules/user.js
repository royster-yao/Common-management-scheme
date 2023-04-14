import { login, getUserInfo } from "@/api/sys"
import md5 from "md5"
import { setItem, getItem, removeAllItem } from "@/utils/storeage/storage"
import { TOKEN } from "@/constant"
import router from "@/router"
import { setTimeStamp } from "@/utils/logout/auth"
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || "",
    userInfo: {},
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    /**
     * 登录请求动作
     * @param {*} conetxt
     * @param {*} userInfo
     * @returns
     */
    login(conetxt, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password),
        })
          .then((data) => {
            this.commit("user/setToken", data.token)
            // 跳转
            router.push("/")
            // 保存登录时间
            setTimeStamp()
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    /**
     * 获取用户信息
     * @param {*} conetxt
     * @returns
     */
    async getUserInfo() {
      const res = await getUserInfo()
      this.commit("user/setUserInfo", res)
      return res
    },
    /**
     * 退出登录
     */
    logout() {
      this.commit("user/setToken", "")
      this.commit("user/setUserInfo", {})
      removeAllItem()
      router.push("/login")
    },
  },
}

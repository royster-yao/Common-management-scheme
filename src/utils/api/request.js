import axios from "axios"
import { ElMessage } from "element-plus"
import store from "@/store"
import { isCheckTimeOut } from "@/utils/logout/auth"

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 添加 icode
  config.headers.icode = "42085307C26E8574"
  // 必须返回 config
  return config
})

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    // 需要判断当前请求是否成功
    if (success) {
      // 成功返回解析后的数据
      return data
    } else {
      // 失败(请求成功，业务失败),消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败
  (err) => {
    // token 过期
    if (err.response && err.response.data && err.response.data.code === 401) {
      store.dispatch("user/logout")
    }

    ElMessage.error(err.message)
    return Promise.reject(err)
  }
)

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在这里统一注入token
    if (store.getters.token) {
      if (isCheckTimeOut()) {
        // 退出
        store.dispatch("user/logout")
        return Promise.reject(new Error("token 失效了！"))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 配置接口国际化
    config.headers["Accept-Language"] = store.getters.language
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default service

import { createRouter, createWebHistory } from "vue-router"
import UserManage from "./modules/UserManage"
import RoleList from "./modules/RoleList"
import PermissionList from "./modules/PermissionList"
import Article from "./modules/Article"
import ArticleCreate from "./modules/ArticleCreate"
import store from "@/store"

/**
 * 私有路由表
 */
export const privateRoutes = [
  UserManage,
  RoleList,
  PermissionList,
  Article,
  ArticleCreate,
]
/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/",
    redirect: "/profile",
    component: () => import("@/views/home/Home.vue"),
    children: [
      // 个人中心
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/profile/index.vue"),
        meta: {
          title: "profile",
          icon: "personnel-info",
        },
      },
      // 404
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/error-page/404.vue"),
      },
      // 401
      {
        path: "/401",
        name: "401",
        component: () => import("@/views/error-page/401.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: publicRoutes,
})
/**
 * 初始化路由表
 */
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}
export default router

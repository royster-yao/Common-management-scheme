import { createRouter, createWebHistory } from "vue-router"
import home from "@/views/home/Home.vue"
/**
 * 私有路由表
 */
const privateRoutes = [
  {
    path: "/user",
    component: home,
    redirect: "/user/manage",
    meta: {
      title: "user",
      icon: "personnel",
    },
    children: [
      {
        path: "/user/manage",
        name: "userManage",
        component: () => import("@/views/user-manage/index.vue"),
        meta: {
          title: "userManage",
          icon: "personnel-manage",
        },
      },
      {
        path: "/user/role",
        name: "userRole",
        component: () => import("@/views/role-list/index.vue"),
        meta: {
          title: "roleList",
          icon: "role",
        },
      },
      {
        path: "/user/permission",
        name: "userPermission",
        component: () => import("@/views/permission-list/index.vue"),
        meta: {
          title: "permissionList",
          icon: "permission ",
        },
      },
      {
        path: "/user/info/:id",
        name: "userInfo",
        component: () => import("@/views/user-info/index.vue"),
        props: true,
        meta: {
          title: "userInfo",
        },
      },
      {
        path: "/user/import",
        name: "import",
        component: () => import("@/views/import/index.vue"),
        meta: {
          title: "excelImport",
        },
      },
    ],
  },
  {
    path: "/article",
    component: home,
    redirect: "/article/ranking",
    meta: { title: "article", icon: "article" },
    children: [
      {
        path: "/article/ranking",
        component: () => import("@/views/article-ranking/index.vue"),
        meta: {
          title: "articleRanking",
          icon: "article-ranking",
        },
      },
      {
        path: "/article/:id",
        component: () => import("@/views/article-detail/index.vue"),
        meta: {
          title: "articleDetail",
        },
      },
      {
        path: "/article/create",
        name: "articleCreate",
        component: () => import("@/views/article-create/index.vue"),
        meta: {
          title: "articleDetail",
          icon: "article-create",
        },
      },
      {
        path: "/article/editor/:id",
        name: "articleEditor",
        component: () => import("@/views/article-create/index.vue"),
        meta: {
          title: "articleEditor",
        },
      },
    ],
  },
]

/**
 * 公开路由表
 */
const publicRoutes = [
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
  routes: [...publicRoutes, ...privateRoutes],
})

export default router

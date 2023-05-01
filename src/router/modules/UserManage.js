import Home from "@/views/home/Home.vue"

export default {
  path: "/user",
  component: Home,
  redirect: "/user/manage",
  name: "userManage",
  meta: {
    title: "user",
    icon: "personnel",
  },
  children: [
    {
      path: "/user/manage",
      component: () => import("@/views/user-manage/index.vue"),
      meta: {
        title: "userManage",
        icon: "personnel-manage",
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
}

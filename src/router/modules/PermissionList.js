import Home from "@/views/home/Home.vue"

export default {
  path: "/user",
  component: Home,
  redirect: "/user/manage",
  name: "permissionList",
  meta: {
    title: "user",
    icon: "personnel",
  },
  children: [
    {
      path: "/user/permission",
      component: () => import("@/views/permission-list/index.vue"),
      meta: {
        title: "permissionList",
        icon: "permission ",
      },
    },
  ],
}

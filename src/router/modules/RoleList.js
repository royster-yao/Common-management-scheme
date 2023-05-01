import Home from "@/views/home/Home.vue"

export default {
  path: "/user",
  component: Home,
  redirect: "/user/manage",
  name: "roleList",
  meta: {
    title: "user",
    icon: "personnel",
  },
  children: [
    {
      path: "/user/role",
      component: () => import("@/views/role-list/index.vue"),
      meta: {
        title: "roleList",
        icon: "role",
      },
    },
  ],
}

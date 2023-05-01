import Home from "@/views/home/Home.vue"

export default {
  path: "/article",
  component: Home,
  redirect: "/article/ranking",
  name: "articleCreate",
  meta: { title: "article", icon: "article" },
  children: [
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
}

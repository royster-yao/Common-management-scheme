<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :uniqueOpened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router>
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"></sidebar-item>
  </el-menu>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router"
import { filterRouters, generateMenus } from "@/utils/route/route"
import { computed } from "vue"
import SidebarItem from "./SidebarItem.vue"
const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRouters(router.getRoutes())
  return generateMenus(fRoutes)
})

// 默认激活项
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style scoped lang="scss"></style>

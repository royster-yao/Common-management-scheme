<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path">
        <!-- 不可点击 -->
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">{{
          generateTitle(item.meta.title)
        }}</span>
        <!-- 可点击 -->
        <span class="redirect" v-else @click="onLinkClick(item)">{{
          generateTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { generateTitle } from "@/utils/i18n/i18n"
import { watch, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"
const route = useRoute()
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  // 当前路由的标准化路由记录
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}
// 监听路由变化
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true,
  }
)
// 跳转点击事件
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}

const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
// 将来需要主题替换，所以 hover 的颜色设置为
</script>

<style scoped lang="scss">
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
  }
  .redirect:hover {
    color: v-bind(linkHoverColor);
  }
  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>

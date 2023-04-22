<template>
  <div class="header-search" :class="{ show: isShow }">
    <div id="guide-search" @click.stop="onShowClick" class="svg-div">
      <svg-icon class-name="search-icon" icon="search"> </svg-icon>
    </div>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange">
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import { filterRouters } from "@/utils/route/route"
import { useRouter } from "vue-router"
import { generateRoutes } from "./FuseData"
import Fuse from "fuse.js"
import { watchSwitchLang } from "@/utils/i18n/i18n.js"

// 数据源
const router = useRouter()
let searchPool = computed(() => {
  const routes = filterRouters(router.getRoutes())
  return generateRoutes(routes)
})

// 搜索库相关
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    shouldSort: true,
    minMatchCharLength: 1,
    keys: [
      {
        name: "title",
        weight: 0.7,
      },
      {
        name: "path",
        weight: 0.3,
      },
    ],
  })
}
initFuse(searchPool.value)

// 控制 search 展示
const isShow = ref(false)
const onShowClick = () => {
  isShow.value = !isShow.value
}

watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener("clicl", onClose)
  } else {
    document.body.removeEventListener("clicl", onClose)
  }
})

// 关闭事件
const headerSearchSelectRef = ref()
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

// search 相关
const search = ref("")
// 搜索方法
const searchOptions = ref([])
const querySearch = (query) => {
  if (query !== "") {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}

// 选中回调
const onSelectChange = (val) => {
  router.push(val.path)
}

watchSwitchLang(() => {
  searchPool = computed(() => {
    const routes = filterRouters(router.getRoutes())
    return generateRoutes(routes)
  })
  initFuse(searchPool.value)
})
</script>

<style scoped lang="scss">
.header-search {
  font-size: 0 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;

  :deep(.search-icon) {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
  :deep(.el-input__inner) {
    padding-bottom: 10px !important;
  }
}
</style>

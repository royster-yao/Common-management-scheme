<template>
  <el-dropdown
    class="internaltional"
    trigger="click"
    @command="handlerSetLanguage">
    <div>
      <el-tooltip content="国际化" :effect="effect">
        <div id="guide-lang"><svg-icon icon="language"></svg-icon></div>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed, defineProps } from "vue"
import { useStore } from "vuex"
import { useI18n } from "vue-i18n"
import { ElMessage } from "element-plus"

defineProps({
  effect: {
    type: String,
    default: "dark",
    validator: function (value) {
      return ["dark", "light"].indexOf(value) !== -1
    },
  },
})

const store = useStore()
const language = computed(() => store.getters.language)

// 切换语言的方法
const i18n = useI18n()
const handlerSetLanguage = (lang) => {
  // 切换i18n 的locale
  i18n.locale.value = lang
  // 修改 vuex 中保存的 language
  store.commit("app/setLanguage", lang)
  // 提示
  ElMessage({
    showClose: false,
    message: i18n.t("msg.toast.switchLangSuccess"),
    type: "success",
  })
}
</script>

<style scoped lang="scss"></style>

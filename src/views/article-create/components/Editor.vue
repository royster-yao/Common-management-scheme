<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t("msg.article.commit")
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits, watch } from "vue"
import E from "wangeditor"
import i18next from "i18next"
import { useStore } from "vuex"
import { commitArticle, editArticle } from "./commit"

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
  detail: {
    type: Object,
  },
})
const emits = defineEmits(["onSuccess"])

const store = useStore()
// 初始化 editor 实例
let editor
// 获取到 dom
let el
const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = "down"
  // 国际化
  editor.config.lang = ""
  editor.i18next = i18next
  editor.config.lang = store.getters.language === "zh" ? "zh-CN" : "en"
  editor.create()
}
onMounted(() => {
  el = document.querySelector("#editor-box")
  initEditor()
})

const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html(),
    })
  } else {
    await commitArticle({
      title: props.title,
      content: editor.txt.html(),
    })
  }
  editor.txt.html("")
  emits("onSuccess")
}
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.txt.html(val.content)
    }
  },
  {
    immediate: true,
  }
)
</script>

<style scoped lang="scss">
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>

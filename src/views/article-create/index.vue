<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <mark-down :detail="detail" :title="title" @onSuccess="onSuccess" />
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <editor :detail="detail" :title="title" @onSuccess="onSuccess" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue"
import Editor from "./components/Editor.vue"
import MarkDown from "./components/MarkDown.vue"
import { articleDetail } from "@/api/article"
import { useRoute } from "vue-router"

const title = ref("")
const activeName = ref("markdown")

const onSuccess = () => {
  title.value = ""
}

// 处理编辑相关
const route = useRoute()
const detail = ref({})
const articleId = route.params.id
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  // 标题赋值
  title.value = detail.value.title
}
if (articleId) {
  getArticleDetail()
}
</script>

<style scoped lang="scss">
.title-input {
  border: 1px solid #75cce3;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>

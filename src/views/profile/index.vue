<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card :features="featureData" class="project-card" />
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :features="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Author from "./components/Author.vue"
import Chapter from "./components/Chapter.vue"
import Feature from "./components/Feature.vue"
import ProjectCard from "./components/ProjectCard.vue"
import { feature as fea } from "@/api/user"
import { ref } from "vue"
import { watchSwitchLang } from "@/utils/i18n/i18n"

const activeName = ref("feature")
let featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await fea()
}
getFeatureData()
watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>

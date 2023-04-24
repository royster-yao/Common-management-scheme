<template>
  <router-view></router-view>
</template>

<script setup>
import { useStore } from "vuex"
import { generateNewStyle, writeNewStyle } from "@/utils/theme/theme"
import { watchSwitchLang } from "./utils/i18n/i18n"
const store = useStore()
generateNewStyle(store.getters.mainColor).then((newStyle) => {
  writeNewStyle(newStyle)
})
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch("user/getUserInfo")
  }
})
</script>

<style scoped lang="scss"></style>

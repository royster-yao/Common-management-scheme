<template>
  <div id="guide-full" @click="onToggle">
    <svg-icon :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'">
    </svg-icon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import screenfull from "screenfull"

// 是否全屏
const isFullScreen = ref(false)
//
const onToggle = () => {
  screenfull.toggle()
}

// 监听 screenfull 的变化
const change = () => {
  isFullScreen.value = screenfull.isFullscreen
}
// on : 绑定监听
onMounted(() => {
  screenfull.on("change", change)
})
// off : 取消监听
onUnmounted(() => {
  screenfull.off("change", change)
})
</script>

<style scoped lang="scss"></style>

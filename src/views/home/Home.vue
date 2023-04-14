<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左侧menu -->
    <side-bar
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }" />
    <div class="main-container">
      <!-- 顶部navbar -->
      <div class="fixed-header">
        <nav-bar />
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script setup>
import NavBar from "./Navbar/NavBar.vue"
import SideBar from "./Sidebar/SideBar.vue"
import AppMain from "./Appmain/AppMain.vue"
import variables from "@/styles/variables.module.scss"
</script>

<style scoped lang="scss">
@import "@/styles/mixin.scss";
@import "@/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.openSidebar .fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};

  .hideSlidebar .fixed-header {
    width: calc(100% - #{$hideSideBarWidth});
  }
}
</style>

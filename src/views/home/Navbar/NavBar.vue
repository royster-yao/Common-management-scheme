<template>
  <div class="navbar">
    <!-- 汉堡 -->
    <Hamburger class="hamburger-container" />
    <Breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
    <div class="right-menu">
      <guide class="right-menu-item hover-effect" />
      <header-search class="right-menu-item hover-effect"></header-search>
      <screen-full class="right-menu-item hover-effect"></screen-full>
      <theme-select class="right-menu-item hover-effect"></theme-select>
      <lang-select class="right-menu-item hover-effect"></lang-select>
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar">
          </el-avatar>
          <!-- <i-ep-add-tools class="el-icon-s-tools"></i-ep-add-tools> -->
          <el-icon><i-ep-tools /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t("msg.navBar.home") }}</el-dropdown-item>
            </router-link>
            <a target="__blank" href="# ">
              <el-dropdown-item>{{ $t("msg.navBar.course") }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">{{
              $t("msg.navBar.logout")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex"
import Hamburger from "@/components/hamburger/index.vue"
import Breadcrumb from "@/components/Breadcrumb/index.vue"
import LangSelect from "@/components/langSelect/index.vue"
import ThemeSelect from "@/components/ThemeSelect/index.vue"
import ScreenFull from "@/components/screen/index.vue"
import HeaderSearch from "@/components/HeaderSearch/index.vue"
import Guide from "@/components/Guide/index.vue"
const store = useStore()
const logout = () => {
  store.dispatch("user/logout")
}
</script>

<style scoped lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }

    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>

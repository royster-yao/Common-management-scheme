<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      class="login-form"
      :rules="loginRules"
      :model="loginForm">
      <div class="title-container">
        <h3 class="title">{{ $t("msg.login.title") }}</h3>
        <lang-select class="lang-select"></lang-select>
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"></el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          :type="passwordType"
          placeholder="password"
          v-model="loginForm.password"
          name="password">
        </el-input>
        <span class="svg-container" @click="onChangePwdType">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
        </span>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handlerLogin"
        :loading="loading"
        >{{ $t("msg.login.loginBtn") }}</el-button
      >
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import LangSelect from "@/components/langSelect/index.vue"
import { reactive, ref } from "vue"
import validateForm from "@/utils/login/validateForm"
import { useStore } from "vuex"
import { useI18n } from "vue-i18n"
// 数据源
const loginForm = reactive({
  username: "super-admin",
  password: "123456",
})

// 验证规则
const i18n = useI18n()
const loginRules = reactive({
  username: [
    {
      required: true,
      message: i18n.t("msg.login.usernameRule"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      validator: validateForm,
    },
  ],
})
// 密码框文本类型
const passwordType = ref("password")
const onChangePwdType = () => {
  if (passwordType.value === "password") {
    passwordType.value = "text"
  } else {
    passwordType.value = "password"
  }
}

// 处理登录
const loading = ref(false)
const store = useStore()
const loginFormRef = ref()
const handlerLogin = () => {
  // 1. 进行表单校验
  loginFormRef.value.validate((valid) => {
    if (!valid) return
    // 2. 触发登录动作
    loading.value = true
    store
      .dispatch("user/login", loginForm)
      .then(() => {
        loading.value = false
        // 3. 进行登录后处理
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>

<style scoped lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        // -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    :deep(.lang-select) {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .lang-select {
    position: absolute;
    top: 4px;
    right: 0;
    background-color: #fff;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>

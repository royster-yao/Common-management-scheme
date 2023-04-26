<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%">
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t("msg.excel.close") }}</el-button>
        <el-button @click="onConfirm" type="primary" :loading="loading">{{
          $t("msg.excel.confirm")
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue"
import { useI18n } from "vue-i18n"
import { watchSwitchLang } from "@/utils/i18n/i18n"
import { getUserManageAllList } from "@/api/user-manage"
import { USER_RELATIONS } from "../components/Export2ExcelConstants"
import { dateFilter } from "@/filters/index"

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(["update:modelValue"])

// 导出文件名
const i18n = useI18n()
let exportDefaultName = i18n.t("msg.excel.defaultName")
const excelName = ref(exportDefaultName)
watchSwitchLang(() => {
  exportDefaultName = i18n.t("msg.excel.defaultName")
  excelName.value = exportDefaultName
})
// 点击确定按钮
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  // 数据
  const allUser = (await getUserManageAllList()).list
  const excel = await import("@/utils/excel/Export2Excel")
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName,
  })
  loading.value = false
  closed()
}

// 当使用 export_json_to_excel 的时候，传递的 data 数据，必须为二维数组
const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 时间
      if (headers[key] === "openTime") {
        return dateFilter(item[headers[key]])
      }
      // 角色要特俗处理
      if (headers[key] === "role") {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      return item[headers[key]]
    })
  })
}

/**
 * 关闭
 */
const closed = () => {
  emits("update:modelValue", false)
}
</script>

<style scoped lang="scss">
.el-dialog {
  .el-input {
    border: 1px solid #97c3ee !important;
    border-radius: 4px;
  }
}
</style>

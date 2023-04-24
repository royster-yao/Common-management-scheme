<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="hanleUpload">
        {{ $t("msg.uploadExcel.upload") }}
      </el-button>
    </div>
    <input
      type="file"
      ref="excelUploadInput"
      class="excel-upload-input"
      accept=".xlsx,xls"
      @change="hanleChange" />
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover">
      <i-ep-files class="icon"></i-ep-files>
      <span>{{ $t("msg.uploadExcel.drop") }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue"
import XLSX from "xlsx"
import { getHeaderRow, isExcel } from "./utils"
import { ElMessage } from "element-plus"

const props = defineProps({
  // 上传之前的回调
  beforeUpload: Function,
  // 上传成功的回调
  onSuccess: Function,
})

// 点击上传触发
const loading = ref(false)
const excelUploadInput = ref()
const hanleUpload = () => {
  excelUploadInput.value.click()
}
const hanleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}

/**
 * 拖拽上传
 */

const handleDrop = (e) => {
  // 上传中
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error("你必须要有一个文件")
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error("文件必须是 .xlsx, .xls, .csv 格式")
    return
  }
  upload(rawFile)
}

const handleDragover = (e) => {
  e.dataTransfer.dropEffect = "copy"
}

/**
 * 触发上传事件
 */
const upload = (rawFile) => {
  excelUploadInput.value.value = null
  // 如果用户没有指定上传前回调的话
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果用户指定了上传前的回调,那么只要返回为 true 的时候，才会执行对应的后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

/**
 * 读取数据(异步)
 */
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve) => {
    const reader = new FileReader()
    // 读取操作完成时触发
    reader.onload = (e) => {
      // 1. 获取到解析后的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: "array" })
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 读取 sheet(1) (第一章 表格) 的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据的表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. 处理 loading
      loading.value = false
      // 9. 成功回调
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
}

// 根据导入内容生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    .icon {
      font-size: 60px;
      display: block;
    }
  }
}
</style>

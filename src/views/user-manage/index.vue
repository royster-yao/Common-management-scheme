<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button @click="onClickExcelClick" type="primary">{{
          $t("msg.excel.importExcel")
        }}</el-button>
        <el-button type="success">{{ $t("msg.excel.exportExcel") }}</el-button>
      </div>
    </el-card>
    <!-- table -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!--索引  -->
        <el-table-column label="#" type="index"></el-table-column>
        <!--姓名  -->
        <el-table-column prop="username" :label="$t('msg.excel.name')">
        </el-table-column>
        <!--手机号  -->
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')">
        </el-table-column>
        <!--头像  -->
        <el-table-column :label="$t('msg.excel.name')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]">
            </el-image>
          </template>
        </el-table-column>
        <!--角色  -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role.length > 0 && row.role">
              <el-tag v-for="item in row.role" :key="item.id" size="small">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">
                {{ $t("msg.excel.defaultRole") }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <!--时间  -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filter.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!--操作  -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="300">
          <template #default>
            <el-button type="primary" size="small">
              {{ $t("msg.excel.show") }}
            </el-button>
            <el-button type="info" size="small">
              {{ $t("msg.excel.showRole") }}
            </el-button>
            <el-button type="danger" size="small">
              {{ $t("msg.excel.remove") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[2, 5, 10, 20]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated } from "vue"
import { getUserManageList } from "@/api/user-manage"
import { watchSwitchLang } from "@/utils/i18n/i18n"
import { useRouter } from "vue-router"
// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value,
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
watchSwitchLang(getListData)
onActivated(getListData)

const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

// excel 导入按钮点击事件
const router = useRouter()
const onClickExcelClick = () => {
  router.push("/user/import")
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  :deep(.el-input__wrapper) {
    position: relative;
    .el-input__suffix {
      position: absolute;
      right: 10px;
    }
  }
}
</style>

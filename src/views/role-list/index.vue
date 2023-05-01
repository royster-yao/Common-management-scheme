<template>
  <div>
    <el-card>
      <el-table :data="allRole" border style="width: 100%">
        <el-table-column
          type="index"
          :label="$t('msg.role.index')"
          width="120"></el-table-column>
        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"></el-table-column>
        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"></el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          width="200"
          #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="onDistributePermissionClock(row)"
            v-permission="['distributePermission']"
            >{{ $t("msg.role.assignPermissions") }}</el-button
          >
        </el-table-column>
      </el-table>
      <distribute-permission
        v-model="visible"
        :roleId="selectRoleId"></distribute-permission>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { roleList } from "@/api/role"
import { watchSwitchLang } from "@/utils/i18n/i18n"
import DistributePermission from "./components/DistributePermission.vue"

const allRole = ref([])
const getRoleList = async () => {
  allRole.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)

const visible = ref(false)
const selectRoleId = ref("")
const onDistributePermissionClock = (row) => {
  visible.value = true
  selectRoleId.value = row.id
}
</script>

<style lang="scss" scoped></style>

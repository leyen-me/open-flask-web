<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item>
        <el-button v-auth="'sys:org:save'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="state.dataListLoading" :data="state.dataList" row-key="id" border style="width: 100%">
      <el-table-column prop="name" label="名称" header-align="center"></el-table-column>
      <el-table-column prop="parent_name" label="上级" header-align="center" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序" header-align="center" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
        <template #default="scope">
          <el-button v-auth="'sys:org:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改
          </el-button>
          <el-button v-auth="'sys:org:delete'" type="primary" link @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-or-update ref="addOrUpdateRef" @refresh-data-list="getDataList"></add-or-update>
  </el-card>
</template>

<script setup name="SysOrg">
import useCrud from '@/hooks/useCrud'
import {ref} from 'vue'
import AddOrUpdate from './add-or-update.vue'

const {state, getDataList, deleteHandle} = useCrud({
  baseUrl: '/sys/org',
  isPage: false
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id) => {
  addOrUpdateRef.value.init(id)
}
</script>

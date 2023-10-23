<script setup name="SysUser">
import {ref} from 'vue'
import useCrud from '@/hooks/useCrudV2'
import Save from './save.vue'

const {state, onDataList, onSelectionChange, onSizeChange, onCurrentChange, onDelete} = useCrud({
  baseUrl: '/sys/user',
  queryForm: {
    username: '',
  }
})

const saveRef = ref()
const onSave = id => {
  saveRef.value.show(id)
}
</script>


<template>
  <el-card>
    <el-form :inline="true" :model="state.queryForm" @keyup.enter="onDataList">
      <el-form-item>
        <el-input v-model="state.queryForm.username" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onDataList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-auth="'sys:user:save'" type="primary" @click="onSave(null)">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%"
              @selection-change="onSelectionChange">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="username" label="用户名" header-align="center" align="center"></el-table-column>
      <BaseTableColumn prop="gender" label="性别" dict-type="user_gender"></BaseTableColumn>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
        <template #default="scope">
          <el-button v-auth="'sys:user:update'" type="primary" link @click="onSave(scope.row.id)">修改
          </el-button>
          <el-button v-auth="'sys:user:delete'" type="danger" link @click="onDelete(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :current-page="state.page"
        :page-sizes="state.pageSizes"
        :page-size="state.limit"
        :total="state.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
    >
    </el-pagination>

    <Save ref="saveRef" :base-url="state.baseUrl" @refresh="onDataList"></Save>
  </el-card>
</template>

<template>
  <div class="BaseUser">
    <el-form-item>
      <el-button type="primary" @click="visible = true">新增</el-button>
    </el-form-item>
    <el-dialog v-model="visible" title="选择用户" :close-on-click-modal="false" :width="800" draggable>
      <el-form :inline="true" :model="state.queryForm">
        <el-form-item>
          <el-input v-model="state.queryForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="state.queryForm.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <BaseSelect v-model="state.queryForm.gender" dict-type="user_gender" clearable
                      placeholder="性别"></BaseSelect>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%"
                @selection-change="selectionChangeHandle">
        <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名" header-align="center" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机号" header-align="center" align="center"></el-table-column>
        <el-table-column prop="real_name" label="姓名" header-align="center" align="center"></el-table-column>
        <BaseTableColumn prop="gender" label="性别" dict-type="user_gender"></BaseTableColumn>
        <el-table-column prop="create_time" label="创建时间" header-align="center" align="center"
                         width="180"></el-table-column>
      </el-table>
      <el-pagination
          :current-page="state.page"
          :page-sizes="state.pageSizes"
          :page-size="state.limit"
          :total="state.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
      >
      </el-pagination>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitHandle()">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="BaseUser">
import {reactive, ref} from 'vue'
import useCrud from '@/hooks/useCrud'
import {ElMessage} from 'element-plus'

const state = reactive({
  baseUrl: '/sys/user',
  queryForm: {
    username: '',
    mobile: '',
    gender: ''
  }
})

const visible = ref(false)

const emit = defineEmits(['select'])
const submitHandle = () => {
  const dataList = state.dataListSelections ? state.dataListSelections : []
  if (dataList.length === 0) {
    ElMessage.warning('请选择用户记录')
    return
  }

  visible.value = false

  emit('select', dataList)
}

const {getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle} = useCrud(state)
</script>

<style lang="scss" scoped>
.BaseUser {
  display: inline-block;
}
</style>

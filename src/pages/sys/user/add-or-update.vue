<template>
  <el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
    <el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="dataForm.username" placeholder="用户名" autocomplete="new-password"></el-input>
      </el-form-item>
      <el-form-item prop="real_name" label="姓名">
        <el-input v-model="dataForm.real_name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item prop="org_id" label="所属机构">
        <el-tree-select
            v-model="dataForm.org_id"
            :data="orgList"
            value-key="id"
            check-strictly
            :render-after-expand="false"
            :props="{ label: 'name', children: 'children' }"
            style="width: 100%"
        />
      </el-form-item>
      <el-form-item prop="gender" label="性别">
        <BaseRadioGroup v-model="dataForm.gender" dict-type="user_gender"></BaseRadioGroup>
      </el-form-item>
      <el-form-item prop="mobile" label="手机号">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="dataForm.password" type="password" placeholder="密码" autocomplete="new-password"></el-input>
      </el-form-item>
      <el-form-item prop="roleIdList" label="所属角色">
        <el-select v-model="dataForm.role_id_list" multiple placeholder="所属角色" style="width: 100%">
          <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="postIdList" label="所属岗位">
        <el-select v-model="dataForm.post_id_list" multiple placeholder="所属岗位" style="width: 100%">
          <el-option v-for="post in postList" :key="post.id" :label="post.post_name" :value="post.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <BaseRadioGroup v-model="dataForm.status" dict-type="user_status"></BaseRadioGroup>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitHandle()">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref} from 'vue'
import {ElMessage} from 'element-plus/es'
import {useOrgListApi} from '@/api/sys/orgs'
import {useUserApi, useUserSubmitApi} from '@/api/sys/user'
import {usePostListApi} from '@/api/sys/post'
import {useRoleListApi} from '@/api/sys/role'
import useRefFormData from "@/hooks/useRefFormData";

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const postList = ref([])
const roleList = ref([])
const orgList = ref([])
const dataFormRef = ref()

const {dataForm, assign, reset} = useRefFormData({
  id: '',
  username: '',
  real_name: '',
  org_id: '',
  password: '',
  gender: 0,
  email: '',
  mobile: '',
  role_id_list: [],
  post_id_list: [],
  status: 1
})


const init = (id) => {
  visible.value = true
  reset()

  // id 存在则为修改
  if (id) {
    getUser(id)
  }

  getOrgList()
  getPostList()
  getRoleList()
}

// 获取岗位列表
const getPostList = () => {
  return usePostListApi().then(res => {
    postList.value = res.data
  })
}

// 获取角色列表
const getRoleList = () => {
  return useRoleListApi().then(res => {
    roleList.value = res.data
  })
}

// 获取机构列表
const getOrgList = () => {
  return useOrgListApi().then(res => {
    orgList.value = res.data
  })
}

// 获取信息
const getUser = (id) => {
  useUserApi(id).then(res => {
    assign(res.data)
  })
}

const dataRules = ref({
  username: [{required: true, message: '必填项不能为空', trigger: 'blur'}],
  real_name: [{required: true, message: '必填项不能为空', trigger: 'blur'}],
  mobile: [{required: true, message: '必填项不能为空', trigger: 'blur'}],
  org_id: [{required: true, message: '必填项不能为空', trigger: 'blur'}]
})

// 表单提交
const submitHandle = () => {
  dataFormRef.value.validate((valid) => {
    if (!valid) {
      return false
    }

    useUserSubmitApi(dataForm.value).then(() => {
      ElMessage.success({
        message: '操作成功',
        duration: 500,
        onClose: () => {
          visible.value = false
          emit('refreshDataList')
        }
      })
    })
  })
}

defineExpose({
  init
})
</script>

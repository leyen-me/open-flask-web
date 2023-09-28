<template>
  <el-card>
    <el-form style="width: 30%;" ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px"
             @keyup.enter="handleDataForm()">
      <el-form-item label="用户名">
        <span>{{ userStore.user.username }}</span>
      </el-form-item>
      <el-form-item prop="password" label="原密码">
        <el-input v-model="dataForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="new_password" label="新密码">
        <el-input v-model="dataForm.new_password" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="confirm_password" label="确认密码">
        <el-input v-model="dataForm.confirm_password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleDataForm">确定</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup name="ProfilePassword">
import {reactive, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {validatePassword} from '@/utils/validate'
import {updatePasswordApi} from '@/api/sys/user'
import {ElMessage} from 'element-plus'
import {closeTab} from '@/utils/tabs'
import useUserStore from "@/store/modules/userStore";

const router = useRouter()
const route = useRoute()
const dataFormRef = ref(null)

const userStore = useUserStore()

const dataForm = reactive({
  password: '',
  new_password: '',
  confirm_password: ''
})

const dataRules = ref({
  password: [{required: true, message: '必填项不能为空', trigger: 'blur'}],
  new_password: [{required: true, validator: validatePassword, trigger: 'blur'}],
  confirm_password: [{required: true, message: '必填项不能为空', trigger: 'blur'}]
})

const handleDataForm = () => {
  dataFormRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    // 修改密码
    updatePasswordApi(dataForm).then(() => {
      ElMessage.success('修改成功')
      // 关闭当前tab
      closeTab(router, route)
    })
  })
}
</script>

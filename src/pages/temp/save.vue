<script setup>
import {ref} from 'vue'
import useRefFormData from "@/hooks/useRefFormDataV2";
import service from "@/utils/request";
import {ElMessage} from "element-plus";

const props = defineProps({
  baseUrl: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['refresh'])
const visible = ref(false)

const formDataRef = ref()
const {formData, formDataAssign, formDataReset} = useRefFormData({
  id: '',
  username: ''
})
const dataRules = ref({
  username: [{required: true, message: '姓名' + '不能为空', trigger: 'blur'}],
})

const show = (id) => {
  visible.value = true
  formDataReset()
  id && getInfo(id)
}
const getInfo = (id) => {
  service.get(props.baseUrl + "/" + id).then(res => {
    formDataAssign(res.data)
  })
}
// 表单提交
const onSubmit = () => {
  formDataRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    let fun = formData.value.id ? service.put(props.baseUrl, formData.value) : service.post(props.baseUrl, formData.value)
    fun.then(() => {
      ElMessage.success({
        message: '操作成功',
        duration: 500,
        onClose: () => {
          visible.value = false
          emit('refresh')
        }
      })
    })
  })
}

defineExpose({
  show
})
</script>


<template>
  <el-dialog v-model="visible" :title="!formData.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
    <el-form ref="formDataRef" :model="formData" :rules="dataRules" label-width="120px" @keyup.enter="onSubmit">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="formData.username" placeholder="用户名" autocomplete="new-password"></el-input>
      </el-form-item>
      <el-form-item prop="gender" label="性别">
        <BaseRadioGroup v-model="formData.gender" dict-type="user_gender"></BaseRadioGroup>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="formData.email" placeholder="邮箱"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

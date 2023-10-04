<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :width="600">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
			<el-form-item label="参数名称" prop="param_name">
				<el-input v-model="dataForm.param_name" placeholder="参数名称"></el-input>
			</el-form-item>
			<el-form-item label="参数键" prop="param_key">
				<el-input v-model="dataForm.param_key" placeholder="参数键"></el-input>
			</el-form-item>
			<el-form-item label="参数值" prop="param_value">
				<el-input v-model="dataForm.param_value" placeholder="参数值"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input v-model="dataForm.remark" placeholder="备注"></el-input>
			</el-form-item>
			<el-form-item label="系统参数" prop="param_type">
				<fast-radio-group v-model="dataForm.param_type" dict-type="params_type"></fast-radio-group>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus/es'

import { useParamsApi, useParamsSubmitApi } from '@/api/sys/params'
import useRefFormData from "@/hooks/useRefFormData";

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const {dataForm, assign, reset} = useRefFormData({
	id: '',
	param_name: '',
	param_type: 0,
	param_key: '',
	param_value: '',
	remark: ''
})

const init = (id) => {
	visible.value = true
	reset()

	if (id) {
		getParams(id)
	}
}

const getParams = (id) => {
	useParamsApi(id).then(res => {
		assign(res.data)
	})
}

const dataRules = ref({
	param_name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	param_type: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	param_key: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	param_value: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid) => {
		if (!valid) {
			return false
		}

		useParamsSubmitApi(dataForm .value).then(() => {
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

<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="80px" @keyup.enter="submitHandle()">
			<el-form-item label="岗位编码" prop="post_code">
				<el-input v-model="dataForm.post_code"></el-input>
			</el-form-item>
			<el-form-item label="岗位名称" prop="post_name">
				<el-input v-model="dataForm.post_name"></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input-number v-model="dataForm.sort" :min="0"></el-input-number>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<BaseRadioGroup v-model="dataForm.status" dict-type="post_status"></BaseRadioGroup>
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

import { usePostApi, usePostSubmitApi } from '@/api/sys/post'
import useRefFormData from "@/hooks/useRefFormData"

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const {dataForm, assign, reset} = useRefFormData({
	id: '',
	post_code: '',
	post_name: '',
	sort: 0,
	status: 1
})

const init = (id) => {
	visible.value = true
	reset()

	// id 存在则为修改
	if (id) {
		getPost(id)
	}
}

const getPost = (id) => {
	usePostApi(id).then(res => {
		assign(res.data)
	})
}

const dataRules = ref({
	post_code: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	post_name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid) => {
		if (!valid) {
			return false
		}

		usePostSubmitApi(dataForm.value).then(() => {
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

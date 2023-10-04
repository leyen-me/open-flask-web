<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="80px">
			<el-form-item prop="dict_type" label="字典类型">
				<el-input v-model="dataForm.dict_type" placeholder="字典类型"></el-input>
			</el-form-item>
			<el-form-item prop="dict_name" label="字典名称">
				<el-input v-model="dataForm.dict_name" placeholder="字典名称"></el-input>
			</el-form-item>
			<el-form-item prop="sort" label="排序">
				<el-input-number v-model="dataForm.sort" controls-position="right" :min="0" label="排序"></el-input-number>
			</el-form-item>
			<el-form-item prop="remark" label="备注">
				<el-input v-model="dataForm.remark" placeholder="备注"></el-input>
			</el-form-item>
			<el-form-item label="数据来源" prop="dict_source">
				<el-radio-group v-model="dataForm.dict_source">
					<el-radio-button :label="0">字典数据</el-radio-button>
					<el-radio-button :label="1">动态SQL</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-if="dataForm.dict_source === 1" prop="dict_sql" label="动态SQL">
				<el-input
					v-model="dataForm.dict_sql"
					type="textarea"
					placeholder="如：select id as dict_value, name as dict_label from sys_role where deleted = 0"
				></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useDictTypeApi, useDictTypeSubmitApi } from '@/api/sys/dict'
import useRefFormData from "@/hooks/useRefFormData";

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()
const {dataForm, assign, reset} = useRefFormData({
	id: '',
	dict_type: '',
	dict_name: '',
	sort: 0,
	dict_source: 0,
	dict_sql: '',
	remark: ''
})

const dataRules = ref({
	dict_type: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	dict_name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	dict_source: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	dict_sql: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

const init = (id) => {
	visible.value = true
	reset()

	// id 存在则为修改
	if (id) {
		getDictType(id)
	}
}

const getDictType = (id) => {
	useDictTypeApi(id).then(res => {
		assign(res.data)
	})
}

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid) => {
		if (!valid) {
			return false
		}
		
		useDictTypeSubmitApi(dataForm.value).then(() => {
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

<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="name" label="名称">
				<el-input v-model="dataForm.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item prop="remark" label="备注">
				<el-input v-model="dataForm.remark" placeholder="备注"></el-input>
			</el-form-item>
			<el-form-item label="菜单权限">
				<el-tree  ref="menuListTree" :data="menuList" :props="{ label: 'name', children: 'children' }" node-key="id" show-checkbox>
					<template #default="{ node, data }">
						<span class="custom-tree-node">
							<span>{{ node.label }}</span>
						</span>
					</template>
				</el-tree>
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
import { ElMessage, ElTree } from 'element-plus/es'

import { useRoleApi, useRoleMenuApi, useRoleSubmitApi } from '@/api/sys/role'
import useRefFormData from "@/hooks/useRefFormData"

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const menuList = ref([])
const menuListTree = ref()
const dataFormRef = ref()

const {dataForm, assign, reset} = useRefFormData({
	id: '',
	name: '',
	menu_id_list:[],
	org_id_list: [],
	remark: ''
})

const init = (id) => {
	visible.value = true
	reset()
	if (menuListTree.value) {
		menuListTree.value.setCheckedKeys([])
	}

	// 菜单列表
	getMenuList(id)
}

// 获取菜单列表
const getMenuList = (id) => {
	return useRoleMenuApi().then(res => {
		menuList.value = res.data
		if (id) {
			getRole(id)
		}
	})
}

// 获取信息
const getRole = (id) => {
	useRoleApi(id).then(res => {
		assign(res.data)
		dataForm.value.menu_id_list.forEach(menuId => {
			menuListTree.value.setChecked(menuId, true)
		})
	})
}

const dataRules = ref({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid) => {
		if (!valid) {
			return false
		}
		dataForm.value.menu_id_list = [...menuListTree.value.getHalfCheckedKeys(), ...menuListTree.value.getCheckedKeys()]

		useRoleSubmitApi(dataForm.value).then(() => {
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

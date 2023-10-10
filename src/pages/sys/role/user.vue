<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm">
			<el-form-item>
				<el-input v-model="state.queryForm.username" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.mobile" placeholder="手机号"></el-input>
			</el-form-item>
			<el-form-item>
				<BaseSelect v-model="state.queryForm.gender" dict-type="user_gender" clearable placeholder="性别"></BaseSelect>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
			<BaseUser @select="userHandle"></BaseUser>
			<el-form-item>
				<el-button type="danger" @click="deleteBatchHandle()">删除</el-button>
			</el-form-item>
		</el-form>
		<el-table
			v-loading="state.dataListLoading"
			:data="state.dataList"
			border
			style="width: 100%"
			@selection-change="selectionChangeHandle"
			@sort-change="sortChangeHandle"
		>
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="username" label="用户名" header-align="center" align="center"></el-table-column>
			<el-table-column prop="mobile" label="手机号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="real_name" label="姓名" header-align="center" align="center"></el-table-column>
			<BaseTableColumn prop="gender" label="性别" dict-type="user_gender"></BaseTableColumn>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button type="primary" link @click="deleteBatchHandle(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
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
	</el-card>
</template>

<script setup>
import useCrud from '@/hooks/useCrud'
import { reactive } from 'vue'
import { useRoleUserSubmitApi } from '@/api/sys/role'
import { ElMessage } from 'element-plus/es'

const props = defineProps({
	roleId: {
		type: Number,
		required: true
	}
})

const state = reactive({
  baseUrl: '/sys/role/user',
	deleteUrl: '/sys/role/user/' + props.roleId,
	queryForm: {
		role_id: props.roleId,
		username: '',
		mobile: '',
		gender: ''
	}
})

const userHandle = (userIdList) => {
	useRoleUserSubmitApi(props.roleId, userIdList).then(() => {
		ElMessage.success({
			message: '操作成功',
			duration: 500,
			onClose: () => {
				getDataList()
			}
		})
	})
}

const { getDataList, sizeChangeHandle, selectionChangeHandle, sortChangeHandle, currentChangeHandle, deleteBatchHandle } = useCrud(state)
</script>

<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.username" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.address" placeholder="登录地点"></el-input>
			</el-form-item>
			<el-form-item>
				<BaseSelect v-model="state.queryForm.status" dict-type="success_fail" placeholder="登录状态" clearable></BaseSelect>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="downloadExcel()">导出</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" @selection-change="selectionChangeHandle">
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="id" label="序号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="username" label="用户名" header-align="center" align="center"></el-table-column>
			<el-table-column prop="ip" label="登录IP" header-align="center" align="center"></el-table-column>
			<el-table-column prop="user_agent" label="User Agent" show-overflow-tooltip header-align="center" align="center"></el-table-column>
			<BaseTableColumn prop="status" label="登录状态" dict-type="success_fail"></BaseTableColumn>
			<BaseTableColumn prop="operation" label="操作信息" dict-type="login_operation"></BaseTableColumn>
			<el-table-column prop="create_time" label="登录时间" header-align="center" align="center" width="165"></el-table-column>
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

<script setup name="SysLogLogin">
import useCrud from '@/hooks/useCrud'
import { reactive } from 'vue'
import { useLogLoginExportApi } from '@/api/sys/log'

const state = reactive({
	baseUrl: '/sys/log/login',
	queryForm: {
		username: '',
		address: '',
		status: ''
	}
})

const downloadExcel = () => {
	useLogLoginExportApi()
	return
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle } = useCrud(state)
</script>

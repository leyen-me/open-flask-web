<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.real_name" placeholder="用户"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.req_uri" placeholder="请求URI"></el-input>
			</el-form-item>
			<el-form-item>
				<BaseSelect v-model="state.queryForm.status" placeholder="操作状态" dict-type="success_fail" clearable> </BaseSelect>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" @selection-change="selectionChangeHandle">
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="real_name" label="用户" show-overflow-tooltip header-align="center" align="center"></el-table-column>
			<el-table-column prop="req_uri" label="请求URI" show-overflow-tooltip header-align="center" align="center"></el-table-column>
			<el-table-column prop="req_method" label="请求方法" show-overflow-tooltip header-align="center" align="center"></el-table-column>
			<BaseTableColumn
				prop="operate_type"
				label="操作类型"
				show-overflow-tooltip
				dict-type="log_operate_type"
				header-align="center"
				align="center"
			></BaseTableColumn>
			<el-table-column prop="duration" label="执行时长" show-overflow-tooltip header-align="center" align="center">
				<template #default="scope"> {{ scope.row.duration }}ms </template>
			</el-table-column>
			<BaseTableColumn prop="status" label="操作状态" show-overflow-tooltip dict-type="success_fail"></BaseTableColumn>
			<el-table-column prop="create_time" label="创建时间" show-overflow-tooltip header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="80">
				<template #default="scope">
					<el-button type="primary" link @click="detailHandle(scope.row)">详情</el-button>
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

		<!-- 详情 -->
		<operate-detail ref="detailRef"></operate-detail>
	</el-card>
</template>

<script setup name="SysLogOperate">
import useCrud from '@/hooks/useCrud'
import { reactive, ref } from 'vue'
import OperateDetail from './operate_detail.vue'

const state = reactive({
	dataListUrl: '/sys/log/operate/page',
	queryForm: {
		real_name: '',
		module: '',
		req_uri: '',
		status: ''
	}
})

const detailRef = ref()
const detailHandle = (row) => {
	detailRef.value.init(row)
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle } = useCrud(state)
</script>

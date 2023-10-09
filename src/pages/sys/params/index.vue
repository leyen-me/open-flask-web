<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.param_key" placeholder="参数键"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.param_value" placeholder="参数值"></el-input>
			</el-form-item>
			<el-form-item>
				<BaseSelect v-model="state.queryForm.param_type" dict-type="params_type" placeholder="系统参数" clearable></BaseSelect>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addOrUpdateHandle()"> 新增 </el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="danger" @click="deleteBatchHandle()"> 删除 </el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" @selection-change="selectionChangeHandle">
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="param_name" label="参数名称" show-overflow-tooltip header-align="center" align="center"></el-table-column>
			<el-table-column prop="param_key" label="参数键" show-overflow-tooltip header-align="center" align="center"></el-table-column>
			<el-table-column prop="param_value" label="参数值" show-overflow-tooltip header-align="center" align="center"></el-table-column>
			<BaseTableColumn prop="param_type" label="系统参数" dict-type="params_type"></BaseTableColumn>
			<el-table-column prop="remark" label="备注" show-overflow-tooltip header-align="center" align="center"></el-table-column>
			<el-table-column prop="create_time" label="创建时间" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改 </el-button>
					<el-button type="primary" link @click="deleteBatchHandle(scope.row.id)">删除 </el-button>
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

		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update ref="addOrUpdateRef" @refreshDataList="getDataList"></add-or-update>
	</el-card>
</template>

<script setup name="SysParamsIndex">
import useCrud from '@/hooks/useCrud'
import { reactive, ref } from 'vue'
import AddOrUpdate from './add-or-update.vue'
 
const state = reactive({
	dataListUrl: '/sys/params/page',
	deleteUrl: '/sys/params',
	queryForm: {
		param_type: '',
		param_key: '',
		param_value: ''
	}
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id) => {
	addOrUpdateRef.value.init(id)
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle } = useCrud(state)
</script>

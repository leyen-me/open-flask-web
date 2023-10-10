<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm">
			<el-form-item>
				<el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
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
			<el-table-column prop="dict_value" label="字典值" header-align="center" align="center"></el-table-column>
			<el-table-column prop="dict_label" label="字典标签" show-overflow-tooltip header-align="center" align="center">
				<template #default="scope">
					<el-tag v-if="scope.row.label_class" :type="scope.row.label_class === 'primary' ? '' : scope.row.label_class">
						{{ scope.row.dict_label }}
					</el-tag>
					<span v-else>
						{{ scope.row.dict_label }}
					</span>
				</template>
			</el-table-column>
			<el-table-column prop="sort" label="排序" sortable="custom" header-align="center" align="center"></el-table-column>
			<el-table-column prop="create_time" label="创建时间" header-align="center" align="center" width="180"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
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
		<!-- 新增 / 修改 -->
		<add-or-update ref="addOrUpdateRef" @refresh-data-list="getDataList"></add-or-update>
	</el-card>
</template>

<script setup>
import useCrud from '@/hooks/useCrud'
import { reactive, ref } from 'vue'
import AddOrUpdate from './data-add-or-update.vue'

const props = defineProps({
	dictTypeId: {
		type: Number,
		required: true
	}
})

const state = reactive({
  baseUrl: '/sys/dict/data',
	queryForm: {
		dict_type_id: props.dictTypeId
	}
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id) => {
	addOrUpdateRef.value.dataForm.dict_type_id = props.dictTypeId
	addOrUpdateRef.value.init(id)
}

const { getDataList, sizeChangeHandle, selectionChangeHandle, sortChangeHandle, currentChangeHandle, deleteBatchHandle } = useCrud(state)
</script>

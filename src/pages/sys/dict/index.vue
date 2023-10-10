<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList">
			<el-form-item>
				<el-input v-model="state.queryForm.dict_type" placeholder="字典类型" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.dict_name" placeholder="字典名称" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-form-item>
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
			<el-table-column prop="dict_type" label="字典类型" header-align="center" align="center"> </el-table-column>
			<el-table-column prop="dict_name" label="字典名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="remark" label="备注" show-overflow-tooltip header-align="center" align="center"></el-table-column>
			<el-table-column prop="dict_source" label="数据来源" header-align="center" align="center">
				<template #default="scope">
					<span v-if="scope.row.dict_source === 0">字典数据</span>
					<span v-else>动态SQL</span>
				</template>
			</el-table-column>
			<el-table-column prop="sort" label="排序" sortable="custom" header-align="center" align="center"></el-table-column>
			<el-table-column prop="create_time" label="创建时间" header-align="center" align="center" width="180"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="200">
				<template #default="scope">
					<el-button v-if="scope.row.dict_source === 0" type="primary" link @click="showDictDataHandle(scope.row)">字典配置</el-button>
					<el-button v-if="scope.row.dict_source === 1" type="primary" link @click="showDataSqlHandle(scope.row)">动态数据</el-button>
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

		<!-- 动态数据 -->
		<el-drawer v-if="dataSqlVisible" v-model="dataSqlVisible" :title="dataSqlTitle" :size="800" :close-on-press-escape="false">
			<data-sql :dict-type-id="dict_type_id"></data-sql>
		</el-drawer>

		<!-- 字典配置 -->
		<el-drawer v-if="dictDataVisible" v-model="dictDataVisible" :title="dictDataTitle" :size="800" :close-on-press-escape="false">
			<dict-data :dict-type-id="dict_type_id"></dict-data>
		</el-drawer>
	</el-card>
</template>

<script setup name="SysDict">
import useCrud from '@/hooks/useCrud'
import { reactive, ref } from 'vue'
import AddOrUpdate from './type-add-or-update.vue'
import DataSql from './data-sql.vue'
import DictData from './data.vue'

const state = reactive({
  baseUrl: '/sys/dict/type',
	queryForm: {
		dict_name: '',
		dict_type: ''
	}
})

const dictDataVisible = ref(false)
const dictDataTitle = ref()
const dict_type_id = ref()
const showDictDataHandle = (row) => {
	dictDataVisible.value = true
	dict_type_id.value = row.id
	dictDataTitle.value = '字典配置 - ' + row.dict_type
}

const dataSqlVisible = ref(false)
const dataSqlTitle = ref()
const showDataSqlHandle = (row) => {
	dataSqlVisible.value = true
	dict_type_id.value = row.id
	dataSqlTitle.value = '动态数据 - ' + row.dict_type
}

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id) => {
	addOrUpdateRef.value.init(id)
}

const { getDataList, sizeChangeHandle, selectionChangeHandle, sortChangeHandle, currentChangeHandle, deleteBatchHandle } = useCrud(state)
</script>

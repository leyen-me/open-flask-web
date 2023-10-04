<template>
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
		<el-table-column prop="dict_label" label="字典标签" show-overflow-tooltip header-align="center" align="center"> </el-table-column>
	</el-table>
</template>

<script setup>
import { reactive } from 'vue'
import useCrud from '@/hooks/useCrud'

const props = defineProps({
	dictTypeId: {
		type: Number,
		required: true
	}
})

const state = reactive({
	dataListUrl: '/sys/dict/type/list/sql',
	isPage: false,
	queryForm: {
		id: props.dictTypeId
	}
})

const { selectionChangeHandle, sortChangeHandle } = useCrud(state)
</script>

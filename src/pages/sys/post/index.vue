<template>
	<el-card>
		<!-- 查询条件 -->
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.post_code" placeholder="岗位编码" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.post_name" placeholder="岗位名称" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<BaseSelect v-model="state.queryForm.status" dict-type="post_status" clearable placeholder="状态"></BaseSelect>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button v-auth="'sys:post:save'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-form-item>
			<el-form-item>
				<el-button v-auth="'sys:post:delete'" type="danger" @click="deleteBatchHandle()">删除</el-button>
			</el-form-item>
		</el-form>

		<!-- 查询结果 -->
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" @selection-change="selectionChangeHandle">
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="post_code" label="岗位编码" header-align="center" align="center"></el-table-column>
			<el-table-column prop="post_name" label="岗位名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="sort" label="排序" header-align="center" align="center"></el-table-column>
			<BaseTableColumn prop="status" label="状态" dict-type="post_status"></BaseTableColumn>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button v-auth="'sys:post:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
					<el-button v-auth="'sys:post:delete'" type="primary" link @click="deleteBatchHandle(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页组件 -->
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
		<add-or-update ref="addOrUpdateRef" @refresh-data-list="getDataList"></add-or-update>
	</el-card>
</template>

<script setup name="SysPost">
import useCrud from '@/hooks/useCrud'
import { reactive, ref } from 'vue'
import AddOrUpdate from './add-or-update.vue'

const state = reactive({
	baseUrl: '/sys/post',
	queryForm: {
		post_code: '',
		post_name: '',
		status: ''
	}
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id) => {
	addOrUpdateRef.value.init(id)
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle } = useCrud(state)
</script>

import service from '@/utils/request'
import { onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

const useCrud = (options) => {
	const defaultOptions = {
		createdIsNeed: true,
		dataListUrl: '',
		isPage: true,
		deleteUrl: '',
		primaryKey: 'id',
		exportUrl: '',
		queryForm: {},
		dataList: [],
		order: '',
		asc: false,
		page: 1,
		limit: 10,
		total: 0,
		pageSizes: [1, 10, 20, 50, 100, 200],
		dataListLoading: false,
		dataListSelections: [],
	}

	const mergeDefaultOptions = (options, props) => {
		for (const key in options) {
			if (!Object.getOwnPropertyDescriptor(props, key)) {
				props[key] = options[key]
			}
		}
		return props
	}

	// 覆盖默认值
	const state = mergeDefaultOptions(defaultOptions, options)

	onMounted(() => {
		if (state.createdIsNeed) {
			query()
		}
	})

	const query = (finishFunc) => {
		if (!state.dataListUrl) {
			return
		}
		state.dataListLoading = true
		service
			.get(state.dataListUrl, {
				params: {
					order: state.order,
					asc: state.asc,
					page: state.isPage ? state.page : null,
					limit: state.isPage ? state.limit : null,
					...state.queryForm
				}
			})
			.then((res) => {
				state.dataList = state.isPage ? res.data.list : res.data
				state.total = state.isPage ? res.data.total : 0
			})
			.finally(() => {
				state.dataListLoading = false
				if (finishFunc) finishFunc()
			})
	}

	const getDataList = (finishFunc) => {
		state.page = 1
		query(finishFunc)
	}

	const sizeChangeHandle = (val) => {
		state.page = 1
		state.limit = val
		query()
	}

	const currentChangeHandle = (val) => {
		state.page = val
		query()
	}

	// 多选
	const selectionChangeHandle = (selections) => {
		state.dataListSelections = selections.map((item) => state.primaryKey && item[state.primaryKey])
		console.log(selections)
	}

	// 排序
	const sortChangeHandle = (data) => {
		const { prop, order } = data

		if (prop && order) {
			state.order = prop
			state.asc = order === 'ascending'
		} else {
			state.order = ''
		}

		query()
	}

	const deleteHandle = (key) => {
		if (!state.deleteUrl) {
			return
		}

		ElMessageBox.confirm('确定进行删除操作?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
			.then(() => {
				service.delete(state.deleteUrl + '/' + key).then(() => {
					ElMessage.success('删除成功')
					query()
				})
			})
			.catch(() => {})
	}

	const deleteBatchHandle = (key) => {
		let data = []
		if (key) {
			data = [key]
		} else {
			data = state.dataListSelections ? state.dataListSelections : []
			if (data.length === 0) {
				ElMessage.warning('请选择删除记录')
				return
			}
		}

		ElMessageBox.confirm('确定进行删除操作?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
			.then(() => {
				if (state.deleteUrl) {
					service.delete(state.deleteUrl, { data }).then(() => {
						ElMessage.success('删除成功')
						query()
					})
				}
			})
			.catch(() => {})
	}

	const downloadHandle = (url, filename, method) => {
		return axios({
			responseType: 'blob',
			url: url,
			method: method
		})
			.then((res) => {
				// 创建a标签
				const down = document.createElement('a')
				// 文件名没传，则使用时间戳
				down.download = filename || new Date().getTime().toString()
				// 隐藏a标签
				down.style.display = 'none'

				// 创建下载url
				let binaryData = []
				binaryData.push(res.data)
				down.href = URL.createObjectURL(new Blob(binaryData))

				// 模拟点击下载
				document.body.appendChild(down)
				down.click()

				// 释放URL
				URL.revokeObjectURL(down.href)
				// 下载完成移除
				document.body.removeChild(down)
			})
			.catch(err => {
				ElMessage.error(err.message)
			})
	}

	return {
		getDataList,
		sizeChangeHandle,
		currentChangeHandle,
		selectionChangeHandle,
		sortChangeHandle,
		deleteHandle,
		deleteBatchHandle,
		downloadHandle
	}
}

export default useCrud

<template>
	<el-select :model-value="modelValue + ''" :placeholder="placeholder" :clearable="clearable" @change="$emit('update:modelValue', $event)">
		<el-option v-for="data in dataList" :key="data.dict_value" :label="data.dict_label" :value="data.dict_value">{{ data.dict_label }}</el-option>
	</el-select>
</template>

<script setup name="FastSelect">
import { getDictDataList } from '@/utils/tool'
import useAppStore from "@/store/modules/appStore";

const appStore = useAppStore()
const props = defineProps({
	modelValue: {
		type: [Number, String],
		required: true
	},
	dictType: {
		type: String,
		required: true
	},
	clearable: {
		type: Boolean,
		required: false,
		default: () => false
	},
	placeholder: {
		type: String,
		required: false,
		default: () => ''
	}
})

const dataList = getDictDataList(appStore.dictList, props.dictType)
</script>

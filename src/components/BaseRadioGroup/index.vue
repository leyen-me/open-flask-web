<template>
  <el-radio-group :model-value="modelValue + ''" @change="$emit('update:modelValue', $event)">
    <el-radio v-for="data in dataList" :key="data.dict_value" :label="data.dict_value">{{ data.dict_label }}</el-radio>
  </el-radio-group>
</template>

<script setup name="BaseRadioGroup">
import { getDictDataList } from '@/utils/tool'
import useAppStore from "@/store/modules/appStore";

const props = defineProps({
  modelValue: {
    type: [Number, String],
    required: true
  },
  dictType: {
    type: String,
    required: true
  }
})

const appStore = useAppStore()
const dataList = getDictDataList(appStore.dictList, props.dictType)
</script>

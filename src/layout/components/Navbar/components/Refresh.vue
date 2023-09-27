<template>
	<el-button icon="Refresh" size="large" @click="onRefresh" text style="font-size: 16px" />
</template>

<script setup>
import { useRefresh } from '@/hooks/useRefresh'
const { onRefresh } = useRefresh()
</script>

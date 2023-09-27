<template>
	<el-button icon="FullScreen" size="large" @click="toggle" text style="font-size: 16px;"/>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
const { toggle } = useFullscreen()
</script>

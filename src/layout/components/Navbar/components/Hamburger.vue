<template>
  <el-icon class="hamburger" :size="20" @click="onClick">
    <Menu></Menu>
  </el-icon>
</template>

<script setup>
import useAppStore from "@/store/modules/appStore";

const appStore = useAppStore()
const onClick = () => {
  appStore.setSidebarOpened()
}
</script>

<style lang="scss" scoped>
.hamburger {
  cursor: pointer;
}
</style>

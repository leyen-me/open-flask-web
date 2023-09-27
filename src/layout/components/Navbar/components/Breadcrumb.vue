<template>
  <el-breadcrumb separator="/" :separator-icon="ArrowRight" class="navbar-breadcrumb">
    <el-breadcrumb-item key="home">
      <span>首页</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
      <span>{{ item }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import {useRoute} from 'vue-router'
import {ArrowRight} from '@element-plus/icons-vue'
import {computed} from 'vue'

const route = useRoute()
const breadcrumb = computed(() => route.meta.breadcrumb)
</script>

<style lang="scss" scoped>
.navbar-breadcrumb {
  padding-left: var(--el-margin-base);
  display: flex;
  align-items: center;

  ::v-deep(.el-breadcrumb__inner) {
    color: var(--theme-header-text-color) !important;
  }
}
</style>

<template>
  <template v-if="menu.children.length > 0">
    <el-sub-menu :key="menu.path" :index="menu.path">
      <template #title>
        <svg-icon class="menu-icon" :icon="menu.meta.icon"></svg-icon>
        <span class="menu-title">{{ menu.meta.title }}</span>
      </template>
      <menu-item v-for="sub in menu.children" :key="sub.path" :menu="sub"></menu-item>
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :key="menu.path" :index="menu.path" @click="onClick(menu)">
      <svg-icon class="menu-icon" :icon="menu.meta.icon"></svg-icon>
      <template #title>
        <span class="menu-title">{{ menu.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {isExternalLink, replaceLinkParam} from '@/utils/tool'
import useAppStore from "@/store/modules/appStore";

defineProps({
  menu: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const appStore = useAppStore()

const onClick = (menu) => {
  // 不是新开页面，则直接切换路由
  if (!menu.meta.newOpen) {
    router.push(menu.path)
    return
  }
  // 新开页面逻辑
  if (isExternalLink(menu.meta.url)) {
    // 外链
    window.open(replaceLinkParam(menu.meta.url), '_blank')
  } else {
    // 内部组件
    window.open('#' + menu.meta.url, '_blank')
  }
}
</script>

<style lang="scss" scoped>
.menu-icon {
  font-size: 18px;
}

.menu-title {
  padding-left: 8px;
  padding-right: 40px;
  user-select: none;
}
</style>

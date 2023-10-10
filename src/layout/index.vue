<template>
  <el-container class="layout-container layout-vertical">
    <el-aside class="layout-sidebar">
      <el-scrollbar>
        <BaseSideNavLogo :sidebar-opened="appStore.sidebarOpened"></BaseSideNavLogo>
        <el-menu :collapse="appStore.sidebarOpened" :default-active="defaultActive" text-color="#000">
          <menu-item v-for="menu in routerStore.menuRoutes" :key="menu.path" :menu="menu"></menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <div class="navbar-container">
          <NavbarLeft/>
          <NavbarRight/>
        </div>
        <Tabs/>
      </el-header>
      <Main/>
    </el-container>
  </el-container>
</template>

<script setup>
import NavbarLeft from '@/layout/components/Navbar/NavbarLeft.vue'
import NavbarRight from '@/layout/components/Navbar/NavbarRight.vue'
import Main from '@/layout/components/Main/index.vue'
import Tabs from '@/layout/components/Tabs/index.vue'
import MenuItem from '@/layout/components/Menu/MenuItem.vue'
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import useAppStore from "@/store/modules/appStore";
import useRouterStore from "@/store/modules/routerStore";

const appStore = useAppStore()
const routerStore = useRouterStore()
const route = useRoute()

const defaultActive = computed(() => {
  const {path} = route
  return path
})

appStore.sidebarOpened = document.body.clientWidth < 768;
</script>

<style lang="scss" scoped>
.layout-header {
  padding: 0;
}

.navbar-container {
  display: flex;
  align-items: center;
  height: var(--el-header-height);
  padding: var(--el-header-padding);
  border-bottom: 1px solid #e8e8e8;
}

.el-container {
  .el-aside {
    width: auto;
  }
}

.el-menu {
  border-right: none;
}

.el-header {
  height: auto;
}

.el-main {
  background-color: #f2f2f2;
}

.el-menu--collapse {
  --el-menu-icon-width: 18px;
}
</style>

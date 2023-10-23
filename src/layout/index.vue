<template>
  <el-container class="layout-container">
    <el-aside class="layout-sidebar layout-sidebar-left" v-if="!isMobile">
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

  <template v-if="isMobile">
    <el-drawer
        class="layout-drawer"
        v-model="appStore.sidebarOpened"
        title="I am the title"
        direction="ltr"
        :with-header="false"
        size="70%"
    >
      <el-scrollbar>
        <BaseSideNavLogo></BaseSideNavLogo>
        <el-menu :default-active="defaultActive" text-color="#000">
          <menu-item v-for="menu in routerStore.menuRoutes" :key="menu.path" :menu="menu"></menu-item>
        </el-menu>
      </el-scrollbar>
    </el-drawer>
  </template>
</template>

<script setup>
import NavbarLeft from '@/layout/components/Navbar/NavbarLeft.vue'
import NavbarRight from '@/layout/components/Navbar/NavbarRight.vue'
import Main from '@/layout/components/Main/index.vue'
import Tabs from '@/layout/components/Tabs/index.vue'
import MenuItem from '@/layout/components/Menu/MenuItem.vue'
import {computed, ref} from 'vue'
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

const isMobile = ref(document.body.clientWidth < 768)
const ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    isMobile.value = entry.contentRect.width < 768
  }
});
ro.observe(document.body);
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

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

@media screen and (max-width: $mobile-width) {
  .layout-container {
    display: flex;
    flex-direction: column;

    .el-container {
      flex: 1;
    }
  }

  .layout-drawer {
    --el-drawer-padding-primary: 0px !important;

    ::v-deep(.el-drawer__body) {
      padding: 0 !important;
    }
  }

  .layout-sidebar-left {
    display: none;
  }
}
</style>

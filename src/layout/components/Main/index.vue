<template>
  <el-scrollbar>
    <el-main class="layout-main">
      <el-scrollbar class="layout-scrollbar">
        <div class="layout-card">
          <router-view v-slot="{ Component, route }">
            <keep-alive :include="[...tabsStore.cachedViews]">
              <component :is="Component" :key="route.name"/>
            </keep-alive>
            <!--<component :is="Component" :key="route.name"/>-->
          </router-view>
        </div>
      </el-scrollbar>
    </el-main>
  </el-scrollbar>
</template>

<script setup>
import {RouterView} from 'vue-router'
import {computed} from 'vue'

import useAppStore from "@/store/modules/appStore";
import useTabsStore from "@/store/modules/tabStore";


const appStore = useAppStore()
const tabsStore = useTabsStore()
const theme = computed(() => appStore.theme)
</script>

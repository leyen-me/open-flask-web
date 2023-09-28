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
import useTabsStore from "@/store/modules/tabStore";

const tabsStore = useTabsStore()
</script>

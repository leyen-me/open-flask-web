<template>
  <div class="navbar-left">
    <Hamburger/>
    <Breadcrumb/>
  </div>
</template>

<script setup>
import Hamburger from './components/Hamburger.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import useAppStore from "@/store/modules/appStore";

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.navbar-left {
  flex: 1;
  height: inherit;
  display: flex;
  align-items: center;
}


@media screen and (max-width: $mobile-width) {
  .el-breadcrumb {
    display: none;
  }
}
</style>

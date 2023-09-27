<template>
  <el-dropdown class="avatar-container" trigger="hover">
    <el-button class="avatar-wrapper" size="large" text>
      <el-avatar shape="circle" :size="24" :src="userStore.user.avatar"></el-avatar>
      <span>{{ userStore.user.username }}</span>
      <el-icon class="el-icon--right">
        <ArrowDown/>
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu class="user-dropdown">
        <router-link to="/profile/password">
          <el-dropdown-item>修改密码</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click="logout"> 退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {ArrowDown} from '@element-plus/icons-vue'
import useUserStore from "@/store/modules/userStore";

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
  userStore.logoutAction().then(() => {
    location.reload()
  })
}
</script>

<style lang="scss" scoped>
.avatar-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: var(--theme-header-height);
  margin-left: var(--el-margin-base);

  .avatar-wrapper {
    display: flex;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    padding: 0 16px;
    color: var(--theme-header-text-color);

    span {
      margin: 0 4px;
    }
  }
}
</style>

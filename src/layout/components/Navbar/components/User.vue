<template>
  <el-popover
      placement="bottom-start"
      trigger="hover"
      :width="100"
  >
    <div class="tabs-popover">
      <el-button @click="onUpdatePassword" text icon="Edit">修改密码</el-button>
      <el-button @click="onLogout" text icon="Close">退出登录</el-button>
    </div>
    <template #reference>
      <el-button class="account-wrapper" size="large" text>
        <el-icon size="large">
          <User/>
        </el-icon>
        <el-text class="account" truncated>{{ userStore.user.username }}</el-text>
        <el-icon size="large">
          <ArrowDown/>
        </el-icon>
      </el-button>
    </template>
  </el-popover>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {ArrowDown} from '@element-plus/icons-vue'
import useUserStore from "@/store/modules/userStore";

const userStore = useUserStore()
const router = useRouter()

const onUpdatePassword = () => {
  router.push({path: "/profile/password"})
}
const onLogout = () => {
  userStore.logoutAction().then(() => {
    location.reload()
  })
}
</script>

<style lang="scss" scoped>
.tabs-popover {
  display: flex;
  flex-direction: column;

  .el-button {
    width: 100%;
    justify-content: flex-start;
  }

  .el-button + .el-button {
    margin-left: 0;
    margin-top: 2px;
  }
}

.account-wrapper {
  p {

  }

  .account {
    margin: 0 6px;
    max-width: 100px;
  }
}
</style>

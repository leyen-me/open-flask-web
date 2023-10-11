<template>
  <div class="page-login">
    <main>
      <section class="login-info app-v-scrollbar">
        <h1 class="login-info-logo-text">{{ LOGO_ENGLISH_NAME }}</h1>
        <div>
          <h3>欢迎使用<br/>{{ BASE_TITLE }}</h3>
          <p>Welcome to use the bidding document making system</p>
        </div>
        <div class="login-info-desc">基于Vue3、TypeScript、Element Plus、Vue Router、Pinia、Axios、Vite等开发的后台管理</div>
      </section>
      <section class="login-form-wrapper app-v-scrollbar">
        <div class="login-form-header">
					<span class="login-form-curr-login-model-active">{{
              currLoginModel === LOGIN_MODEL.ACCOUNT ? LOGIN_MODEL.ACCOUNT : currLoginModel === LOGIN_MODEL.MOBILE ? LOGIN_MODEL.MOBILE : '未知登录'
            }}</span>
          <span @click="handleSwitchLoginModelClick" v-if="SMS_LOGIN_STATE">{{
              currLoginModel === LOGIN_MODEL.ACCOUNT ? LOGIN_MODEL.MOBILE : currLoginModel === LOGIN_MODEL.MOBILE ? LOGIN_MODEL.ACCOUNT : '未知登录'
            }}</span>
        </div>
        <el-form
            ref="accountLoginFormRef"
            v-show="currLoginModel === LOGIN_MODEL.ACCOUNT"
            :model="accountLoginForm"
            :rules="accountLoginFormRules"
            label-width="120px"
            label-position="top"
            class="login-form"
        >
          <el-form-item label="账号" prop="username">
            <template #label="data">
              <div class="login-form-label">
                <el-icon color="#727D8B">
                  <Avatar/>
                </el-icon>
                <span>{{ data.label }}</span>
              </div>
            </template>
            <el-input v-model="accountLoginForm.username" size="large" placeholder="请输入账号" type="text"
                      autocomplete="off" clearable/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <template #label="data">
              <div class="login-form-label">
                <el-icon color="#727D8B">
                  <Briefcase/>
                </el-icon>
                <span>{{ data.label }}</span>
              </div>
            </template>
            <el-input
                v-model="accountLoginForm.password"
                size="large"
                show-password
                placeholder="请输入密码"
                type="password"
                autocomplete="off"
                clearable
            />
          </el-form-item>
          <el-form-item label="验证码" prop="captcha" v-if="isCaptchaEnabled">
            <template #label="data">
              <div class="login-form-label">
                <BaseSvgIcon icon="icon-security-fill" style="font-size: 16px; color: #727d8b"></BaseSvgIcon>
                <span>{{ data.label }}</span>
              </div>
            </template>
            <div class="captcha-form">
              <el-input
                  class="captcha-form-input"
                  v-model="accountLoginForm.captcha"
                  size="large"
                  placeholder="请输入验证码"
                  type="captcha"
                  autocomplete="off"
                  clearable
                  @keyup.enter="handleLoginClick"
              />
              <img :src="captchaBase64" alt="验证码" @click="handleCaptchaClick"/>
            </div>
          </el-form-item>
        </el-form>
        <el-form
            ref="mobileLoginFormRef"
            v-show="currLoginModel === LOGIN_MODEL.MOBILE"
            :model="mobileLoginForm"
            :rules="mobileLoginFormRules"
            label-width="120px"
            label-position="top"
            class="login-form"
        >
          <el-form-item label="手机号" prop="mobile">
            <template #label="data">
              <div class="login-form-label">
                <el-icon color="#727D8B">
                  <Avatar/>
                </el-icon>
                <span>{{ data.label }}</span>
              </div>
            </template>
            <el-input v-model="mobileLoginForm.mobile" size="large" placeholder="请输入手机号" type="text"
                      autocomplete="off" clearable/>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <template #label="data">
              <div class="login-form-label">
                <BaseSvgIcon icon="icon-security-fill" style="font-size: 16px; color: #727d8b"></BaseSvgIcon>
                <span>{{ data.label }}</span>
              </div>
            </template>
            <div class="captcha-form">
              <el-input
                  class="captcha-form-input"
                  v-model="mobileLoginForm.code"
                  size="large"
                  placeholder="请输入验证码"
                  type="captcha"
                  autocomplete="off"
                  clearable
                  @keyup.enter="handleLoginClick"
              />
              <el-button v-if="!sms.disabled" type="primary" size="large" @click="handleSendCodeClick">发送验证码
              </el-button>
              <el-button v-else type="default" size="large" disabled>{{ sms.count }} 秒后重新发送</el-button>
            </div>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="large" class="login-btn" :loading="loading" @click="handleLoginClick">
          {{ loadingText }}
        </el-button>
      </section>
    </main>
  </div>
</template>

<script setup name="Login">
import {ref, reactive, computed} from 'vue'
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'
import {LOGIN_MODEL, LOCAL_LOGIN_PASSWORD, LOCAL_LOGIN_USERNAME, SMS_LOGIN_STATE, LOGO_ENGLISH_NAME} from '@/constants'
import {useCaptchaApi, useCaptchaEnabledApi, useSendCodeApi} from '@/api/auth'
import {validateMobile} from '@/utils/validate'
import useUserStore from "@/store/modules/userStore";

const userStore = useUserStore()

const BASE_TITLE = import.meta.env.VITE_APP_BASE_TITLE

const router = useRouter()
// 账号登录表单
const accountLoginFormRef = ref()
// 短信登录表单
const mobileLoginFormRef = ref()
// 用户当前登录模式
const currLoginModel = ref(LOGIN_MODEL.ACCOUNT)

const loading = ref(false)
const loadingText = computed(() => (loading.value ? '登录中' : '立即登录'))
const handleValidate = async () => {
  switch (currLoginModel.value) {
    case LOGIN_MODEL.ACCOUNT:
      try {
        await accountLoginFormRef.value.validate()
        return true
      } catch (error) {
        return false
      }
    case LOGIN_MODEL.MOBILE:
      try {
        await mobileLoginFormRef.value.validate()
        return true
      } catch (error) {
        return false
      }
  }
}
const handleLoginClick = async () => {
  if (!(await handleValidate())) {
    return
  }
  loading.value = true
  switch (currLoginModel.value) {
    case LOGIN_MODEL.ACCOUNT:
      userStore
          .accountLoginAction(accountLoginForm)
          .then(() => {
            handleSave()
            router.push({path: '/home'})
          })
          .catch(() => {
            handleCaptchaClick()
          })
          .finally(() => {
            loading.value = false
          })
      break
    case LOGIN_MODEL.MOBILE:
      userStore
          .mobileLoginAction(mobileLoginForm)
          .then(() => {
            router.push({path: '/home'})
          })
          .finally(() => {
            loading.value = false
          })
    default:
      break
  }
}

// 账号登录表单
const accountLoginForm = reactive({
  username: localStorage.getItem(LOCAL_LOGIN_USERNAME) || '',
  password: localStorage.getItem(LOCAL_LOGIN_PASSWORD) || '',
  key: '',
  captcha: '',
  reset: () => {
    accountLoginForm.username = localStorage.getItem(LOCAL_LOGIN_USERNAME) || ''
    accountLoginForm.password = ''
    accountLoginForm.key = ''
    accountLoginForm.captcha = ''
    handleCaptchaClick()
  }
})
const accountLoginFormRules = reactive({
  username: [{required: true, message: '账号必填', trigger: 'blur'}],
  password: [{required: true, message: '密码必填', trigger: 'blur'}],
  captcha: [{required: true, message: '验证码必填', trigger: 'blur'}]
})
// 验证码逻辑
const isCaptchaEnabled = ref(false)
const captchaBase64 = ref('')

const onCaptchaEnabled = async () => {
  const {data} = await useCaptchaEnabledApi()
  isCaptchaEnabled.value = data
  await handleCaptchaClick()
}
const handleCaptchaClick = async () => {
  if (isCaptchaEnabled.value) {
    const {data} = await useCaptchaApi()
    accountLoginForm.key = data.key
    captchaBase64.value = data.image
  }
}
onCaptchaEnabled()

const handleSave = () => {
  localStorage.setItem(LOCAL_LOGIN_USERNAME, accountLoginForm.username)
  localStorage.setItem(LOCAL_LOGIN_PASSWORD, accountLoginForm.password)
}

// 手机号登录表单
const mobileLoginForm = reactive({
  mobile: '',
  code: '',
  reset: () => {
    mobileLoginForm.mobile = ''
    mobileLoginForm.code = ''
  }
})
const mobileLoginFormRules = reactive({
  mobile: [{required: true, message: '手机号必填', trigger: 'blur'}],
  code: [{required: true, message: '验证码必填', trigger: 'blur'}]
})
// 短信验证码相关
const sms = reactive({
  disabled: false,
  total: 60,
  count: 0
})
const timerHandler = () => {
  sms.count = sms.total
  sms.disabled = true
  let timer = setInterval(() => {
    if (sms.count > 1 && sms.count <= sms.total) {
      sms.count--
    } else {
      sms.disabled = false
      clearInterval(timer)
    }
  }, 1000)
}
const handleSendCodeClick = async () => {
  if (!validateMobile(mobileLoginForm.mobile)) {
    ElMessage.error('请输入正确的手机号')
    return
  }
  await useSendCodeApi(mobileLoginForm.mobile)
  ElMessage.success('短信发送成功')
  timerHandler()
}
const handleSwitchLoginModelClick = () => {
  currLoginModel.value =
      currLoginModel.value === LOGIN_MODEL.ACCOUNT ? LOGIN_MODEL.MOBILE : currLoginModel.value === LOGIN_MODEL.MOBILE ? LOGIN_MODEL.ACCOUNT : '未知登录'

  // 切换登录模式，清除数据
  currLoginModel.value === LOGIN_MODEL.ACCOUNT ? accountLoginForm.reset() : mobileLoginForm.reset()
}
</script>

<style lang="scss" scoped>
.page-login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d8dee7;
  --el-border-radius-base: 8px;
}

$raidus: calc(var(--el-border-radius-base) * 2);

main {
  width: 60%;
  height: 80%;
  background-color: #fff;
  border-radius: $raidus;
  padding: 12px;
  display: flex;
  box-shadow: 4px 4px 20px rgba($color: #000000, $alpha: 0.08);

  section {
    border-radius: $raidus;
    overflow-y: auto;
  }

  section:last-child {
    margin-left: 12px;
  }
}

.login-info {
  width: 36%;
  // height: 100%;
  background-color: var(--el-color-primary);
  color: white;
  position: relative;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .login-info-logo-text {
    font-size: var(--el-font-size-medium);
  }

  h3 {
    font-size: calc(var(--el-font-size-medium) * 2);
  }

  p {
    margin-top: 12px;
    opacity: 0.6;
    font-weight: 300;
  }

  .login-info-desc {
    word-break: break-all;
    word-wrap: break-word;
    background-color: #1b4fb0;
    padding: 20px;
    font-weight: 300;
    font-size: 12px;
    border-radius: var(--el-border-radius-base);
  }
}

.login-form-wrapper {
  flex: 1;
  height: 100%;
  padding: 60px;

  .login-form-header {
    display: flex;
    align-items: flex-end;

    .login-form-curr-login-model-active {
      font-size: 30px;
      font-weight: 600;
      text-decoration: none;
      margin-left: 0;
      color: #000000;
    }

    span {
      font-size: 16px;
      text-decoration: underline;
      margin-left: var(--el-margin-base);
      color: #727d8b;
      font-weight: 400;
    }
  }

  a {
    color: var(--el-color-primary);
    cursor: pointer;
    text-decoration: underline;
  }

  p {
    margin-top: 4px;
    font-size: calc(var(--el-font-size-base) - 2px);
    color: #666;
    letter-spacing: 1px;
  }

  .login-form {
    margin-top: 36px;

    ::v-deep(.el-form-item.is-required:not(.is-no-asterisk).asterisk-left > .el-form-item__label:before) {
      content: '';
      display: none;
    }

    ::v-deep(.el-input__inner::placeholder) {
      font-size: var(--el-font-size-extra-small);
    }

    .login-form-label {
      display: flex;
      align-items: center;

      span {
        margin-left: var(--el-margin-base);
        font-size: 12px;
        color: #727d8b;
      }
    }

    .captcha-form {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .captcha-form-input {
        flex: 1;
        margin-right: var(--el-margin-base);
      }

      img {
        height: 100%;
      }
    }
  }

  .login-btn {
    margin-top: 40px;
    min-width: 160px;
    min-height: 44px;
  }
}

// 适配手机端
@media screen and (max-width: 768px) {
  .page-login {
    padding: 12px;
  }

  .login-form-header {
    flex-direction: column;
    align-items: flex-start !important;
    justify-content: flex-start;

    span {
      margin-left: 0 !important;
    }
  }

  main {
    padding: 40px;
    width: 98%;
    height: 98%;
  }

  .login-form-wrapper {
    margin-left: 0 !important;
    padding: 0px !important;
    border-radius: 0;
  }

  .login-info {
    display: none;
  }
}
</style>

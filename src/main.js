import 'element-plus/dist/index.css'
// import '@/assets/main.css'
import '@/styles/index.scss'
import '@/styles/mobile.scss'

import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import directive from '@/directive'
import pinia from "@/store";
import router from '@/router'
import App from '@/App.vue'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {locale: zhCn})
app.mount('#app')
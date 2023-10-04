import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import '@/styles/mobile.scss'

import {createApp} from 'vue'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import pinia from "@/store";
import router from '@/router'
import App from '@/App.vue'
import { directive } from '@/utils/directive'

import '@/icons/iconfont/iconfont'
import '@/icons/iconfont/micon'

import FastTableColumn from '@/components/fast-table-column'
import FastRadioGroup from '@/components/fast-radio-group'
import FastSelect from '@/components/fast-select'
import FastUser from '@/components/fast-user'
import SvgIcon from '@/components/svg-icon'
import AppIcon from '@/utils/icons'

const app = createApp(App)

directive(app)
app.use(FastTableColumn)
app.use(FastRadioGroup)
app.use(FastSelect)
app.use(FastUser)
app.use(SvgIcon)
app.use(AppIcon)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {locale: zhCn})
app.mount('#app')
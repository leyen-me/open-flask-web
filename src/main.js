/* 导入全局样式 */
import 'element-plus/dist/index.css'
import '@/styles/index.scss'

import {createApp} from 'vue'
import App from '@/App.vue'

import ElementPlus from 'element-plus'
import PrintVersion from '@/utils/printVersion'
import ElementPlusIcons from '@/utils/elementPlusIcons'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import pinia from "@/store";
import router from '@/router'

import '@/icons/iconfont/iconfont'
import '@/icons/iconfont/micon'

/* 导入全局指令 */
import drag from "@/directives/drag"
import auth from "@/directives/auth"

/* 导入全局组件 */
import BaseRadioGroup from '@/components/BaseRadioGroup/index.vue'
import BaseSelect from '@/components/BaseSelect/index.vue'
import BaseTableColumn from '@/components/BaseTableColumn/index.vue'
import BaseUser from '@/components/BaseUser/index.vue'
import BaseSvgIcon from '@/components/BaseSvgIcon/index.vue'
import BaseSideNavLogo from '@/components/BaseSideNavLogo/index.vue'

/* 权限模块，动态路由 */
import '@/permission';

const app = createApp(App)

/* 全局自定义指令注册，在此处注册的组件WebStorm才能有代码提示和高亮 */
app.directive('drag', drag)
app.directive('auth', auth)

/* 全局注册组件，在此处注册的组件WebStorm才能有代码提示和高亮 */
app.component("BaseRadioGroup", BaseRadioGroup)
app.component("BaseSelect", BaseSelect)
app.component("BaseTableColumn", BaseTableColumn)
app.component("BaseUser", BaseUser)
app.component("BaseSvgIcon", BaseSvgIcon)
app.component("BaseSideNavLogo", BaseSideNavLogo)

app.use(pinia)
app.use(router)
app.use(PrintVersion)
app.use(ElementPlus, {locale: zhCn})
app.use(ElementPlusIcons)


app.mount('#app')


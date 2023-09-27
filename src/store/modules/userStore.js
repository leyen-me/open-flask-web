import {defineStore} from 'pinia'
import {useAccountLoginApi, useMobileLoginApi, useLogoutApi} from '@/api/auth'
import {useUserInfoApi} from '@/api/sys/user'
import {useAuthorityListApi} from '@/api/sys/menu'

const useUserStore = defineStore('userStore', {
    state: () => ({
        // 用户信息
        user: {
            id: '',
            username: '',
            avatar: ''
        },
        // 权限列表
        authorityList: [],
        // 登录token
        token: ''
    }),
    actions: {
        setUser(val) {
            this.user = val
        },
        setToken(val) {
            this.token = val
            // todo：清除本地缓存
        },
        // 账号登录
        async accountLoginAction(loginForm) {
            const {data} = await useAccountLoginApi(loginForm)
            this.setToken(data.access_token)
        },
        // 手机号登录
        async mobileLoginAction(loginForm) {
            const {data} = await useMobileLoginApi(loginForm)
            this.setToken(data.access_token)
        },
        // 获取用户信息
        async getUserInfoAction() {
            const {data} = await useUserInfoApi()
            this.setUser(data)
        },
        // 获取权限
        async getAuthorityListAction() {
            const {data} = await useAuthorityListApi()
            this.authorityList = data || []
        },
        // 用户退出
        async logoutAction() {
            await useLogoutApi()
            // 移除 token
            this.setToken(null)
        }
    }
})

export default useUserStore

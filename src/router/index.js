import {createRouter, createWebHistory} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {isExternalLink, pathToCamel} from '@/utils/tool'
import Home from '@/pages/home/index.vue'
import useAppStore from "@/store/modules/appStore";
import useRouterStore from "@/store/modules/routerStore";
import useUserStore from "@/store/modules/userStore";

NProgress.configure({showSpinner: false})

const constantRoutes = [
    {
        path: '/redirect',
        component: () => import('../layout/index.vue'),
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('../layout/components/Router/Redirect.vue')
            }
        ]
    },
    {
        path: '/iframe/:query?',
        component: () => import('../layout/components/Router/Iframe.vue')
    },
    {
        path: '/login',
        component: () => import('../pages/login/index.vue')
    },
    {
        path: '/404',
        component: () => import('@/pages/error/404/index.vue')
    }
]

const asyncRoutes = {
    path: '/',
    component: () => import('../layout/index.vue'),
    redirect: '/home',
    children: [
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                title: '首页',
                affix: true
            }
        },
        {
            path: '/profile/password',
            name: 'ProfilePassword',
            component: () => import('../pages/profile/password.vue'),
            meta: {
                title: '修改密码',
                cache: true
            }
        }
    ]
}

// 配置常量菜单
export const constantMenu = []

export const errorRoute = {
    path: '/:pathMatch(.*)',
    redirect: '/404'
}

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})

// 白名单列表
const whiteList = ['/login']

// 路由跳转前
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const appStore = useAppStore()
    const routerStore = useRouterStore()
    const userStore = useUserStore()

    // token存在的情况
    if (userStore.token) {
        if (to.path === '/login') {
            next('/home')
        } else {
            // 用户信息不存在，则重新拉取
            if (!userStore.user.id) {
                try {
                    await userStore.getUserInfoAction()
                    await userStore.getAuthorityListAction()
                    await appStore.getDictListAction()
                } catch (error) {
                    console.log(error)
                    // 请求异常，则跳转到登录页
                    userStore.setToken('')
                    next('/login')
                    return Promise.reject(error)
                }
                // 动态菜单+常量菜单
                const menuRoutes = await routerStore.getMenuRoutes()
                // 获取扁平化路由，将多级路由转换成一级路由
                const keepAliveRoutes = getKeepAliveRoutes(menuRoutes, [])
                // 添加菜单路由
                asyncRoutes.children.push(...keepAliveRoutes)
                router.addRoute(asyncRoutes)
                // 错误路由
                router.addRoute(errorRoute)
                // 保存路由数据
                routerStore.setRoutes(constantRoutes.concat(asyncRoutes))
                next({...to, replace: true})
            } else {
                next()
            }
        }
    } else {
        // 没有token的情况下，可以进入白名单
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            next('/login')
        }
    }
})

// 路由加载后
router.afterEach(() => {
    NProgress.done()
})


// 获取扁平化路由，将多级路由转换成一级路由
export const getKeepAliveRoutes = (rs, breadcrumb) => {
    const routerList = []
    rs.forEach((item) => {
        if (item.meta.title) {
            breadcrumb.push(item.meta.title)
        }
        if (item.children && item.children.length > 0) {
            routerList.push(...getKeepAliveRoutes(item.children, breadcrumb))
        } else {
            item.meta.breadcrumb.push(...breadcrumb)
            routerList.push(item)
        }
        breadcrumb.pop()
    })
    return routerList
}

// 加载vue组件
const layoutModules = import.meta.glob('/src/pages/**/*.vue')

// 根据路径，动态获取vue组件
const getDynamicComponent = (path) => {
    // 路由是否带index
    if (path.search('index') !== -1) {
        return layoutModules[`/src/pages/${path}.vue`]
    }
    // 没有index就拼接一下index
    return layoutModules[`/src/pages/${path}/index.vue`]
}

// 根据菜单列表，生成路由数据
export const generateRoutes = (menuList) => {
    const routerList = []
    menuList.forEach((menu) => {
        let component
        let path
        if (menu.children && menu.children.length > 0) {
            component = () => import('@/layout/index.vue')
            path = '/p/' + menu.id
        } else {
            // 判断是否iframe
            if (isIframeUrl(menu)) {
                component = () => import('@/layout/components/Router/Iframe.vue')
                path = '/iframe/' + menu.id
            } else if (menu.url.indexOf('online/form/') !== -1) {
                // component = () => import('@/pages/online/form/index.vue')
                path = '/' + menu.url
            } else {
                component = getDynamicComponent(menu.url)
                path = '/' + menu.url
            }
        }
        const route = {
            path: path,
            name: pathToCamel(path),
            component: component,
            children: [],
            meta: {
                title: menu.name,
                icon: menu.icon,
                id: '' + menu.id,
                url: menu.url,
                cache: true,
                newOpen: menu.open_style === 1,
                breadcrumb: []
            }
        }
        // 有子菜单的情况
        if (menu.children && menu.children.length > 0) {
            route.children.push(...generateRoutes(menu.children))
        }
        routerList.push(route)
    })
    return routerList
}

// 判断是否iframe
const isIframeUrl = (menu) => {
    // 如果是新页面打开，则不用iframe
    if (menu.open_style === 1) {
        return false
    }
    // 是否外部链接
    return isExternalLink(menu.url)
}


export default router
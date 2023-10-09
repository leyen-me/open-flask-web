import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

import useAppStore from "@/store/modules/appStore";
import useRouterStore from "@/store/modules/routerStore";
import useUserStore from "@/store/modules/userStore";
import router from "@/router";
import {ROUTE_WHITE_LIST} from "@/constants";
import asyncRoutes from "@/router/modules/asyncRoutes";
import errorRoute from "@/router/modules/errorRoute";
import constantRoutes from "@/router/modules/constantRoutes";
import {isExternalLink, pathToCamel} from '@/utils/tool'

/* 进度条不显示右上角的圆圈 */
NProgress.configure({showSpinner: false})

/* 动态获取pages目录下所有的页面组件 */
const pageComponentMap = import.meta.glob('@/pages/**/*.vue')

/* 获取扁平化路由，将多级路由转换成一级路由 */
const getKeepAliveRoutes = (rs, breadcrumb) => {
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

/* 根据动态路径获取页面对应的组件 */
const getDynamicComponent = (path) => {
    if (path.search('index') !== -1) {
        return pageComponentMap[`/src/pages/${path}.vue`]
    }
    return pageComponentMap[`/src/pages/${path}/index.vue`]
}

/* 判断是否是iframe */
const isIframeUrl = (menu) => {
    if (menu.open_style === 1) {
        return false
    }
    return isExternalLink(menu.url)
}

/* 根据菜单列表，生成路由数据 */
export const generateRoutes = (menuList) => {
    const routerList = []
    menuList.forEach((menu) => {
        let component = null
        let path = null
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


router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const appStore = useAppStore()
    const routerStore = useRouterStore()
    const userStore = useUserStore()

    if (userStore.token) {
        if (to.path === '/login') {
            next()
        } else {
            /* 虽然有TOKEN，但是TOKEN可能失效，所以需要验证ID，ID存在则表示用户登录成功 */
            if (!userStore.user.id) {
                try {
                    /* 获取用户信息 */
                    await userStore.getUserInfoAction()
                    /* 获取用户权限列表，用户控制菜单级别的权限 */
                    await userStore.getAuthorityListAction()
                    /* 获取全局字典 */
                    await appStore.getDictListAction()
                } catch (error) {
                    /* 请求有异常，用户无法正常使用系统，则跳转到登录页 */
                    userStore.setToken('')
                    next('/login')
                    return Promise.reject(error)
                }
                /* 拿到后台获取的菜单树和自己的菜单树 */
                const menuRouteTree = await routerStore.getMenuRouteTree()

                /* 将树型结构的菜单进行扁平化处理 */
                const menuRouteList = getKeepAliveRoutes(menuRouteTree, [])
                asyncRoutes.children.push(...menuRouteList)
                router.addRoute(asyncRoutes)

                /* 错误路由 */
                router.addRoute(errorRoute)

                /* 保存路由数据 */
                routerStore.setRoutes(constantRoutes.concat(asyncRoutes))
                next({...to, replace: true})
            } else {
                /* 用户已登录，可以访问所有页面 */
                next()
            }
        }
    } else {
        if (ROUTE_WHITE_LIST.indexOf(to.path) > -1) {
            /* 用户未登录情况下，可访问白名单地址 */
            next()
        } else {
            /* 用户未登录情况下，访问其他地址，必须要登录之后访问 */
            next('/login')
        }
    }
})


router.afterEach(() => {
    NProgress.done()
})
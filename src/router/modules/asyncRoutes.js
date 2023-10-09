import Home from "@/pages/home/index.vue";

/**
 * 动态路由，跟业务相关
 */
const asyncRoutes = {
    path: '/',
    component: () => import('@/layout/index.vue'),
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
            component: () => import('@/pages/profile/password.vue'),
            meta: {
                title: '修改密码',
                cache: true
            }
        }
    ]
}

export default asyncRoutes
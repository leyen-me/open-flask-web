/**
 * 固定路由，跟业务无关
 */
const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/pages/login/index.vue')
    },
    {
        path: '/404',
        component: () => import('@/pages/error/404/index.vue')
    },
    {
        path: '/redirect',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/layout/components/Router/Redirect.vue')
            }
        ]
    },
    {
        path: '/iframe/:query?',
        component: () => import('@/layout/components/Router/Iframe.vue')
    },
]
export default constantRoutes
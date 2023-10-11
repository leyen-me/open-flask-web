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


    /* 这是一个特殊的路由模式，用于匹配所有未被其他路由规则匹配的路径。这通常被用作一个“捕获所有”或“404”路由。能消除动态路由的警告 */
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/pages/error/404/index.vue"),
    },
]
export default constantRoutes
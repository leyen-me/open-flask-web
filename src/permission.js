import 'nprogress/nprogress.css'; // progress bar style

import NProgress from 'nprogress'; // progress bar


NProgress.configure({showSpinner: false})


const constantRoutes = [
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
    {
        path: '/login',
        component: () => import('@/pages/login/index.vue')
    },
    {
        path: '/404',
        component: () => import('@/pages/404.vue')
    }
]
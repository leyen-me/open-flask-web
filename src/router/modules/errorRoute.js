/**
 * 异常处理路由，当用户访问一个不存在的路由的时候，会被重定向到此处
 */
const errorRoute = {
    path: '/:pathMatch(.*)',
    redirect: '/404'
}
export default errorRoute
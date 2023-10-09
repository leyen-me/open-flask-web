import {defineStore} from 'pinia'
import {useMenuNavApi} from '@/api/sys/menu'
import {generateRoutes} from "@/permission";
import constantMenu from "@/router/modules/constantMenu";

const useRouterStore = defineStore('routerStore', {
    state: () => ({
        menuRoutes: [],
        routes: []
    }),
    actions: {
        async getMenuRouteTree() {
            const {data} = await useMenuNavApi()
            const routes = generateRoutes(data)
            this.menuRoutes.push(...routes)
            const constantRoutes = generateRoutes(constantMenu)
            this.menuRoutes.push(...constantRoutes)
            return this.menuRoutes
        },
        setRoutes(routers) {
            this.routes = routers
        }
    }
})

export default useRouterStore

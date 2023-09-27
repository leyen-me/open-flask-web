import {defineStore} from 'pinia'
import {useMenuNavApi} from '@/api/sys/menu'
import {generateRoutes, constantMenu} from '@/router'

const useRouterStore = defineStore('routerStore', {
    state: () => ({
        menuRoutes: [],
        routes: []
    }),
    actions: {
        async getMenuRoutes() {
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

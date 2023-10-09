import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import constantRoutes from "@/router/modules/constantRoutes";

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

export default router
import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import constantRoutes from "@/constants/modules/constantRoutes";

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

export default router
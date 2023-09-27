import {useRouter, useRoute} from 'vue-router'
import {nextTick} from 'vue'
import useTabsStore from "@/store/modules/tabStore";

export const useRefresh = () => {
    const router = useRouter()
    const route = useRoute()
    const tabsStore = useTabsStore()
    const onRefresh = () => {
        tabsStore.delCachedView(route).then(() => {
            nextTick(() => {
                router.replace({path: '/redirect' + route.path}).catch(err => {
                    console.warn(err)
                })
            })
        })
    }
    return {onRefresh}
}

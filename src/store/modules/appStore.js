import {defineStore} from 'pinia'
import {useDictTypeAllApi} from '@/api/sys/dict'
import constantDict from "@/constants/modules/constantDict";

const useAppStore = defineStore('appStore', {
    state: () => ({
        // sidebar 是否展开
        sidebarOpened: false,
        // 字典列表
        dictList: constantDict,
    }),
    actions: {
        setSidebarOpened() {
            this.sidebarOpened = !this.sidebarOpened
        },
        async getDictListAction() {
            const {data} = await useDictTypeAllApi()
            this.dictList = this.dictList.concat(data || [])
        }
    }
})
export default useAppStore

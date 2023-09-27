import useTabsStore from "@/store/modules/tabStore";

export const closeTab = (router, tab) => {
    const tabsStore = useTabsStore()
    if (tab.meta && tab.meta.affix) {
        return
    }
    tabsStore.delView(tab)
    toLastView(router, tabsStore.visitedViews, tab)
}

// 关闭其他tabs
export const closeOthersTabs = (router, tab) => {
    const tabsStore = useTabsStore()
    router.push(tab)
    tabsStore.delOthersViews(tab)
}

// 关闭全部tabs
export const closeAllTabs = (router, tab) => {
    const tabsStore = useTabsStore()
    tabsStore.delAllViews()
    toLastView(router, tabsStore.visitedViews, tab)
}

// 跳转到最后一个tab
export const toLastView = (router, visitedViews, view) => {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView) {
        router.push(latestView.fullPath)
    } else {
        if (view.name === 'Home') {
            router.replace({path: '/redirect' + view.fullPath})
        } else {
            router.push('/')
        }
    }
}

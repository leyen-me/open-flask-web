<template>
  <div class="tabs-container">
    <ul class="tabs-item" @mousedown="onMousedown" v-drag>
      <li v-for="tab in tabsStore.visitedViews" :key="tab.path">
        <el-popover
            @before-enter="closeTabPopover(tab)"
            placement="bottom-start"
            :width="200"
            :trigger="'contextmenu'"
            v-model:visible="tab.contextmenuVisible"
        >
          <div class="tabs-popover">
            <el-button v-if="activeTabName === tab.path" @click="handleOnRefresh" text icon="Refresh">刷新</el-button>
            <!-- 首页默认不能关闭 -->
            <el-button v-if="!(tab.path === '/home' || tab.name === '首页')" @click="closeTabNow(tab)" text
                       icon="CircleClose">关闭
            </el-button>
            <el-button v-if="activeTabName === tab.path" @click="onClose('closeOthers')" text icon="CircleClose">
              关闭其他
            </el-button>
            <el-button @click="onClose('closeAll')" text icon="CircleClose">关闭所有</el-button>
          </div>
          <template #reference>
            <el-button :class="activeTabName === tab.path ? 'is-active' : 'is-no-active'" class="tab-pane"
                       @click="tabClick(tab)">
              {{ tab.title }}
              <el-icon v-if="!(tab.path === '/home' || tab.name === '首页')" @click="tabRemove(tab.path)">
                <Close/>
              </el-icon>
            </el-button>
          </template>
        </el-popover>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {watch, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {closeAllTabs, closeOthersTabs, closeTab} from '@/utils/tabs'
import {Close} from '@element-plus/icons-vue'
import {useRefresh} from "@/hooks/useRefresh";
import useTabsStore from "@/store/modules/tabStore";
import useRouterStore from "@/store/modules/routerStore";

const {onRefresh} = useRefresh()
const onMousedown = () => {
}

const tabsStore = useTabsStore()
const routerStore = useRouterStore()

const route = useRoute()
const router = useRouter()

const activeTabName = ref(route.path)

// 关闭当前打开的popover
const closeTabPopover = (tab) => {
  tabsStore.visitedViews.forEach((element) => {
    element.contextmenuVisible = false
  })
  if (tab) {
    tab.contextmenuVisible = true
  }
}

// 刷新
const handleOnRefresh = () => {
  closeTabPopover()
  onRefresh()
}

// 是否固定
const isAffix = (tab) => {
  return tab.meta && tab.meta.affix
}

watch(route, () => {
  // 当前路由，添加到tabs里
  if (route.name) {
    addTab()
  }
})

onMounted(() => {
  // 初始化
  initTabs()
  addTab()
})

// 初始化固定tab
const initTabs = () => {
  const affixTabs = getAffixTabs(routerStore.routes)
  for (const tab of affixTabs) {
    // 需要有tab名称
    if (tab.name) {
      tabsStore.addView(tab)
    }
  }
}

// 获取需要固定的tabs
const getAffixTabs = (routes) => {
  let tabs = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      tabs.push({
        fullPath: route.path,
        path: route.path,
        name: route.name,
        meta: {...route.meta}
      })
    }
    if (route.children) {
      const tempTabs = getAffixTabs(route.children)
      if (tempTabs.length >= 1) {
        tabs = [...tabs, ...tempTabs]
      }
    }
  })
  return tabs
}

// 添加tab
const addTab = () => {
  // 交互:新加的路由滚动到最后
  let flag = tabsStore.visitedViews.find((item) => {
    return item.path === route.path
  })

  tabsStore.addView(route)
  tabsStore.addCachedView(route)

  activeTabName.value = route.path

  if (!flag) {
    let tabsElement = document.getElementsByClassName('tabs-item')[0]
    setTimeout(function () {
      tabsElement.scrollLeft = tabsElement.scrollWidth
    }, 0)
  }
}

// tab被选中
const tabClick = (tab) => {
  tab.path && router.push(tab.path)
}

// 点击关闭tab
const tabRemove = (path) => {
  const tab = tabsStore.visitedViews.filter((tab) => tab.path === path)
  closeTab(router, tab[0])
}

// 关闭当前tab
const closeTabNow = (tab) => {
  closeTabPopover(tab)
  closeTab(router, tab)
}

// dropdown 关闭事件
const onClose = (type) => {
  closeTabPopover()
  switch (type) {
    case 'close':
      closeTab(router, route)
      break
    case 'closeOthers':
      closeOthersTabs(router, route)
      break
    case 'closeAll':
      closeAllTabs(router, route)
      break
  }
}
</script>

<style lang="scss" scoped>
.tabs-popover {
  display: flex;
  flex-direction: column;

  .el-button {
    width: 100%;
    justify-content: flex-start;
  }

  .el-button + .el-button {
    margin-left: 0px;
    margin-top: 2px;
  }
}

.tabs-container {
  width: 100%;
  display: flex;
  position: relative;
  z-index: 6;
  height: var(--el-tabs-header-height);
  background-color: var(--theme-bg-color-secondarycontainer);

  .tabs-item {
    display: flex;
    width: 100%;
    height: 100%;

    overflow-x: auto;

    .tab-pane {
      height: 100%;
      border: none;
      border-radius: 0px;
      background-color: transparent;
      border-bottom: 1px solid #e7e7e7;
      border-right: 1px solid #e7e7e7;
      color: rgba($color: #000000, $alpha: 0.6);

      .el-icon {
        margin-left: 8px;
        color: rgba($color: #000000, $alpha: 0.6);
      }

      .el-icon:hover {
        color: rgba($color: #000000, $alpha: 0.9);
      }
    }

    .el-button + .el-button {
      margin-left: -1px;
    }

    .el-button.is-no-active:hover {
      background-color: #eee;
    }

    .is-active {
      text-shadow: 0 0 0.3px currentcolor;
      background-color: #fff;
      font-size: 14px;
      color: var(--el-color-primary);
    }
  }

  // 隐藏滚动条
  .tabs-item::-webkit-scrollbar {
    display: none;
  }
}
</style>

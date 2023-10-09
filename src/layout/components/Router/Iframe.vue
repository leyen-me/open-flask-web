<template>
    <iframe :src="url" class="iframe" @load="load"></iframe>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import {replaceLinkParam} from '@/utils/tool'

const route = useRoute()

const url = ref('')
const loading = ref(false)

watch(
    () => route,
    value => {
      if (value.path === '/iframe') {
        initUrl(value)
      }
    },
    {deep: true}
)

onMounted(() => {
  initUrl(route)
})
const initUrl = (route) => {
  loading.value = true
  const {meta, query} = route
  if (query.url) {
    url.value = query.url
  } else {
    url.value = replaceLinkParam(meta.url)
  }
}
const load = () => {
  loading.value = false
}
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: 100%;
  border-radius: var(--el-card-border-radius);
  border: 0;
}
</style>

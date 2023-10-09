<script setup>
import {useTitle} from '@vueuse/core'

useTitle(import.meta.env.VITE_APP_BASE_TITLE)
</script>

<template>
  <router-view/>
</template>
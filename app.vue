<script setup>
import { useEditionStore } from '@/stores/edition'
import { useTooltipStore } from '@/stores/tooltip'

const tooltipStore = useTooltipStore()
const editionStore = useEditionStore()
const { edit } = storeToRefs(editionStore)
const { tooltip } = storeToRefs(tooltipStore)

const nuxtApp = useNuxtApp()
const loading = ref(false)
const loadTimeout = ref(null)

nuxtApp.hook('page:start', () => {
  loadTimeout.value = setTimeout(() => {
    loading.value = true
  }, 50)
})
nuxtApp.hook('page:finish', () => {
  clearTimeout(loadTimeout.value)
  loading.value = false
})
</script>

<template>
  <NuxtLayout>
    <Loading v-if="loading" />
    <NuxtPage />
    <EditPost
      v-if="edit"
      :data="edit" />
    <Tooltip
      v-if="tooltip"
      :data="tooltip.message" />
  </NuxtLayout>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useEditionStore } from '@/stores/edition'
import { usePostsStore } from '@/stores/posts'
import { useNotificationStore } from '@/stores/notification'
import { useTooltipStore } from '@/stores/tooltip'
import { useThemeStore } from '@/stores/theme'

const tooltipStore = useTooltipStore()
const editionStore = useEditionStore()
const postsStore = usePostsStore()
const notificationStore = useNotificationStore()
const themeStore = useThemeStore()

const { initialise } = themeStore

const { notifications } = storeToRefs(notificationStore)
const { edit } = storeToRefs(editionStore)
const { showCreatePost } = storeToRefs(postsStore)
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

onMounted(async () => {
  await initialise()
})
</script>

<template>
  <NuxtLayout>
    <Loading v-if="loading" />
    <NuxtPage />
    <CreatePost v-if="showCreatePost" />
    <EditPost
      v-if="edit"
      :data="edit" />
    <Tooltip
      v-if="tooltip"
      :data="tooltip.message" />
    <Notification
      v-if="notifications"
      :data="notifications" />
  </NuxtLayout>
</template>

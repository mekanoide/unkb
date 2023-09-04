<script setup>
import { storeToRefs } from 'pinia'
import { useActivityStore } from '@/stores/activity'

const activityStore = useActivityStore()

const { fetchActivity } = activityStore

const { data: activity, error, refresh } = useAsyncData(() => fetchActivity())

const {
  data: posts,
  error: postsError,
  refresh: postsRefresh
} = useAsyncData(() => fetchPostsFromConnections())

const handleRefresh = async () => {
  await refresh()
}
</script>

<template>
  {{ posts }}
  <ul v-if="activity && activity.length > 0">
    <li v-for="item in activity" :item="item" :key="item.id">{{ activity }}</li>
  </ul>
  <EmptyState v-else message="No te ha pasado nada" />
</template>

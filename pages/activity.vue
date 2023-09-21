<script setup>

import { useActivityStore } from '@/stores/activity'

const activityStore = useActivityStore()

const { fetchActivity } = activityStore

const { data: activity, error, refresh } = useAsyncData('activity', () => fetchActivity(), {
  lazy: true
})

const {
  data: posts,
  error: postsError,
  refresh: postsRefresh
} = useAsyncData('posts', () => fetchPostsFromConnections(), {
  lazy: true
})

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

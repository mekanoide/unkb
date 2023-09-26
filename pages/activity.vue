<script setup>
import { useActivityStore } from '@/stores/activity'

const activityStore = useActivityStore()

const { fetchActivity } = activityStore

const { data: activity, error, refresh } = await useFetch('/api/v1/activity')
</script>

<template>
  <h1>Actividad</h1>
  <ul v-if="activity && activity.length > 0">
    <li
      v-for="notification in activity"
      :key="notification.id">
      {{ notification.type }} {{ formatFormalDate(notification.created_at) }}
    </li>
  </ul>
  <EmptyState
    v-else
    message="No te ha pasado nada" />
</template>

<script setup>
const { data: activity, error, refresh } = await useFetch('/api/activity')

const textActivity = (type) => {
  switch (type) {
    case 'follow':
      return 'te siguió'
    case 'like':
      return 'le gustó tu publicación'
    case 'reply':
      return 'comentó tu publicación'
    default:
      return ''
  }
}
</script>

<template>
  <h1>Actividad</h1>
  <ul v-if="activity && activity.length > 0">
    <li
      v-for="notification in activity"
      role="link"
      :key="notification.id"
      @click="navigateTo(`/post/${notification.post_id}`)">
      {{ notification.users.handle }}
      {{ textActivity(notification.type) }}
      {{ formatDate(notification.created_at) }}
      <div>{{ notification?.content }}</div>
    </li>
  </ul>
  <EmptyState
    v-else
    message="No te ha pasado nada" />
</template>

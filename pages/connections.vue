<script setup>
definePageMeta({
  middleware: ['auth']
})

import { useMainStore } from '@/stores/main'

const store = useMainStore()

const { fetchConnections } = store

/* Fetch posts from followed users */
const {
  data: connections,
  error: connectionsError,
  refresh: connectionsRefresh
} = useAsyncData(() => fetchConnections())

</script>

<template>
  <Requests />
  <h2>Conexiones con la peñita</h2>
  <ul v-if="connections">
    <Connection
      v-for="connection in connections"
      :data="connection.connection"
      @deleted="connectionsRefresh"
    />
  </ul>
  <EmptyState v-else message="No tienes a nadie" />
</template>

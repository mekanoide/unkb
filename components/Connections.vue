<script setup>
import { useConnectionsStore } from '@/stores/connections'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useConnectionsStore()

const { fetchConnections } = store

/* Fetch posts from followed users */
const {
  data: connections,
  error: connectionsError,
  refresh: connectionsRefresh
} = useAsyncData(() => fetchConnections(props.id))
</script>

<template>
  <Requests />
  <ul v-if="connections && connections.length > 0">
    <Connection
      v-for="connection in connections"
      :data="connection.connection"
      @deleted="connectionsRefresh" />
  </ul>
  <EmptyState
    v-else
    message="No tienes a nadie" />
</template>
  
<script setup>
import { useConnectionsStore } from '@/stores/connections'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['changed'])
const user = useSupabaseUser()

/* Fetch user connections */
const { data: connections, refresh: refreshConnections } = await useFetch(
  `/api/connections/${props.id}`
)

/* Fetch user connection requests */
const { data: requests, refresh: refreshRequests } = await useFetch(
  `/api/connections/requests/own`
)

/* TODO: add requested connections */
</script>

<template>
  <div>
    <Search v-if="user.id === id" />
    <Requests v-if="user.id === id" />
    <ul v-if="(connections && connections.length > 0) || (requests && requests.length > 0)">
      <Connection
        v-if="requests && requests.length > 0"
        v-for="connection in requests"
        :key="connection.id"
        :ownUser="user.id === id"
        :data="connection"
        @changed="refreshRequests" />
      <Connection
        v-if="connections && connections.length > 0"
        v-for="connection in connections"
        :key="connection.id"
        :ownUser="user.id === id"
        :data="connection"
        @changed="refreshConnections" />
    </ul>
    <EmptyState
      v-else
      message="No tienes a nadie" />
  </div>
</template>

<style scoped>
div {
  padding-top: var(--spaceL);
}
</style>
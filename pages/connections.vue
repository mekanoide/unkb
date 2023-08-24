<script setup>
definePageMeta({
  middleware: ['auth']
})

import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'

const store = useMainStore()
const client = useSupabaseClient()
const user = useSupabaseUser()

const { me, editContent, editId } = storeToRefs(store)

/* Fetch posts from followed users */
const {
  data: connectionsData,
  error: connectionsError,
  refresh: connectionsRefresh
} = await useAsyncData('connections', async () => {
  const data = await store.fetchConnections()
  console.log(data)
  return data
})
</script>

<template>
  <Requests />
  <h2>Conexiones con la peñita</h2>
  <ul v-if="connectionsData.length > 0">
    <Connection
      v-for="connection in connectionsData"
      :data="connection.connection"
      @deleted="connectionsRefresh"
    />
  </ul>
  <EmptyState v-else message="No tienes a nadie" />
</template>

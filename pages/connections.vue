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
  <h1>Conexiones con la peñita</h1>
  <Requests />
  <ul>
    <Connection
      v-for="connection in connectionsData"
      :user="connection.connection"
      @deleted="connectionsRefresh"
    />
  </ul>
</template>

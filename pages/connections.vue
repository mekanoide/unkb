<template>
  <h1>Aquí irán las conexiones con la peñita</h1>
  <div>{{ connectionsData }}</div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'

const store = useMainStore()
const client = useSupabaseClient()
const user = useSupabaseUser()

const refreshInterval = ref()

const { me, editContent, editId } = storeToRefs(store)

/* Fetch posts from followed users */
const {
  data: connectionsData,
  error: connectionsError,
  refresh: connectionsRefresh
} = await useAsyncData('connections', async () => {
  const data = await store.fetchConnections()
  console.log(connectionsData)
  return data
})
</script>

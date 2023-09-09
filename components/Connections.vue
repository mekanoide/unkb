<script setup>
import { useConnectionsStore } from '@/stores/connections'
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['changed'])
const user = useSupabaseUser()

/* TODO: add requested connections */
</script>

<template>
  <Requests v-if="user.id === id" />
  <ul v-if="data && data.length > 0">
    <Connection
      v-for="connection in data"
      :key="connection.id"
      :ownUser="user.id === id"
      :data="connection.connection"
      @deleted="emit('changed')" />
  </ul>
  <EmptyState
    v-else
    message="No tienes a nadie" />
</template>
  
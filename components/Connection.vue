<script setup>
import { useConnectionsStore } from '@/stores/connections'
const store = useConnectionsStore()

const { deleteConnection, cancelConnectionRequest } = store

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  ownUser: {
    type: Boolean
  }
})

const emit = defineEmits(['changed'])

const handleDeleteConnection = async () => {
  await deleteConnection(props.data.users.id)
  emit('changed')
}

const handleCancelConnectionRequest = async () => {
  await cancelConnectionRequest(props.data.user_id, props.data.target_id)
  emit('changed')
}
</script>

<template>
  <li>
    <User :data="data.users" />
    <div
      v-if="ownUser"
      class="actions">
      <Button v-if="data.target_id" @click="handleCancelConnectionRequest">Cancelar</Button>
      <Button v-else @click="handleDeleteConnection">Cortar</Button>
    </div>
  </li>
</template>

<style scoped>
li {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}
</style>

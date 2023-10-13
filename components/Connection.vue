<script setup>
import { useConnectionsStore } from '@/stores/connections'
const store = useConnectionsStore()

const { deleteConnection } = store

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  ownUser: {
    type: Boolean
  }
})

const emit = defineEmits(['deleted'])

const handleDelete = async () => {
  await deleteConnection(props.data.users.id)
  emit('deleted')
}
</script>

<template>
  <li>
    <User :data="data.users" />
    <Button v-if="ownUser" @click="handleDelete">Cortar</Button>
  </li>
</template>

<style scoped>
li {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}
</style>

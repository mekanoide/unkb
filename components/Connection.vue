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
  await useFetch('/api/v1/connections/delete', {
    method: 'post',
    body: {
      id: props.data.id
    }
  })
  emit('deleted')
}
</script>

<template>
  <li>
    <User
      :data="data"
      size="large" />
    <Button v-if="ownUser" size="small" @click="handleDelete">Cortar</Button>
  </li>
</template>

<style scoped>
li {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}
</style>

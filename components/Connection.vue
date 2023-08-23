<script setup>
import { useMainStore } from '@/stores/main'; 
const store = useMainStore()

const { deleteConnection } = store

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['deleted'])

const handleDelete = async () => {
  await deleteConnection(props.user.id)
  emit('deleted')
}
</script>

<template>
  <li>
    <User :user="user" size="large" />
    <Button @click="handleDelete">Desconectar</Button>
  </li>
</template>

<style scoped>
li {
  padding: var(--spaceM) 0;
  position: relative;
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}

li + li {
  border-top: 1px dashed var(--colorText);
}
</style>
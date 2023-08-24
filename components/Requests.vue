<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
const store = useMainStore()
const { fetchConnectionRequests } = store
const { requests } = storeToRefs(store)

const client = useSupabaseClient()
const user = useSupabaseUser()
const userId = user.value.id

const acceptConnection = async (id) => {
  const { data: connection1, error: error1 } = await client
    .from('connections')
    .upsert({ user_id: userId, friend_id: id })
  const { data: connection2, error: error2 } = await client
    .from('connections')
    .upsert({ user_id: id, friend_id: userId })
  if (error1) {
    throw error1
  }
  if (error2) {
    throw error2
  }
  return data
}

await fetchConnectionRequests()
</script>

<template>
  <section v-if="requests.length > 0">
    <h2>Peticiones de conexión</h2>
    <ul>
      <li v-for="request in requests">
        <User :data="request.requester" />
        <Button @click="acceptConnection(request.user_id)">Aceptar</Button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  padding: var(--spaceS) var(--spaceM);
  border: 1px dashed var(--colorText);
  border-radius: var(--corner);
}

li {
  padding: var(--spaceS) 0;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
}

li + li {
  border-top: 1px dashed var(--colorText);
}
</style>

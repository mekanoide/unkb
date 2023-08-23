<script setup>
import { useMainStore } from '@/stores/main'
const store = useMainStore()
const { fetchConnectionRequests } = store

const client = useSupabaseClient()
const user = useSupabaseUser()
const userId = user.value.id

const {
  data: requests,
  error: errorRequests,
  refresh: errorRefresh
} = await useAsyncData('requests', async () => {
  const data = await fetchConnectionRequests()
  return data
})

const acceptConnection = async (id) => {
  console.log(id)
  const { data, error } = await client
    .from('connections')
    .upsert({ user1_id: userId, user2_id: id })
  if (error) {
    throw error
  }
  return data
}
</script>

<template>
  <section v-if="requests.length > 0">
    <h2>Peticiones de conexión</h2>
    <ul>
      <li v-for="request in requests">
        <span class="handle">@{{ request.requester.handle }}</span>
        <Button size="small" @click="acceptConnection(request.user_id)">Aceptar</Button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
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

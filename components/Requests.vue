<template>
  <section v-if="requests.length > 0">
    <h3>Peticiones de conexión</h3>
    <ul v-if="requests">
      <li v-for="request in requests">
        <span class="handle">@{{ request.requester.handle }}</span>
        <Button size="small" @click="acceptConnection(request.user_id)">Aceptar</Button>
      </li>
    </ul>
  </section>
</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()
const userId = user.value.id

const refreshInterval = ref()

const {
  data: requests,
  error: errorRequests,
  refresh: errorRefresh
} = await useAsyncData('requests', async () => {
  const { data } = await client
    .from('connection_requests')
    .select('user_id, requester:users!user_id(handle)')
    .eq('target_id', userId)
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

onMounted(() => {
  refreshInterval.value = setInterval(errorRefresh, 60000)
})

onBeforeUnmount(() => {
  clearInterval(refreshInterval.value)
})
</script>

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

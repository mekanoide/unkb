<template>
  <section v-if="requests.length > 0">
    <h3>Peticiones de conexión</h3>
    <ul>
      <li v-for="request in requests">
        <span class="handle">@{{ request.child.handle }}</span>
        <Button size="small" @click="acceptConnection(request.child_id)">Aceptar</Button>
      </li>
    </ul>
  </section>
</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()
const userId = user.value.id

const { data: requests, error: errorRequests } = await useAsyncData('requests', async () => {
  const { data } = await client
    .from('connections')
    .select('child_id, child:users!child_id(handle)')
    .eq('parent_id', userId)
    .eq('confirmed', false)
  return data
})

const acceptConnection = async (id) => {
  console.log(id)
  const { data, error } = await client
    .from('connections')
    .update({
      confirmed: true
    })
    .match({child_id: id, parent_id: userId})
  if (error) {
    throw error
  }
  return data
}
</script>

<style scoped>
li {
  padding: var(--spaceS) 0;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
}

li + li {
  border-top: 1px dashed black;
}
</style>

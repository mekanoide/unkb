<template>
  <div v-if="parentPending || connectionPending">Cargando...</div>
  <div v-else>
    <div v-if="isConnected">
      <h1>Ya tienes conexión con {{ parent.handle }}<br/>aquí no hay nada que ver</h1>
      <NuxtLink to="/">Ve a la página de Inicio</NuxtLink>
    </div>
    <div v-else-if="!isConnected && !connectionSent">
      <h1>Quieres conectar con {{ parent.handle }}?</h1>
      <Button type="submit" variant="primary" @click.stop="makeConnection">Por supuesto que sí!</Button>
    </div>
    <div v-else-if="!isConnected && connectionSent">
      <h1>Conexión solicitada!</h1>
      <p>La persona {{ parent.handle }} tiene que confirmar que quiere conectar contigo.<br />Mientras tanto, puedes <NuxtLink to="/">pasarte por la página de inicio</NuxtLink>.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const connectionSent = ref(false)

const isConnected = computed(() => {
  console.log('Padre', parent.value.id)
  console.log('Hijo', user.value.id)
  if (parent.value.id === user.value.id) {
    return true
  }
  console.log(connection.value)
  if (connection.value.length !== 0) {
    return true
  }
})

console.log('Código', route.params.id)

const { data: parent, pending: parentPending } = await useAsyncData('parent', async () => {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('invitation_token', route.params.id)
    .single()

  return data
})

const { data: connection, pending: connectionPending } = await useAsyncData('connection', async () => {
  const { data } = await supabase
    .from('connections')
    .select()
    .match({child_id: user.value.id, parent_id: parent.value.id})
    .maybeSingle()
  return data
})

const makeConnection = async () => {
  const { data, error } = await supabase
    .from('connections')
    .insert({
      parent_id: parent.value.id,
      child_id: user.value.id
    })
  if (error) {
    throw error
  }
  connectionSent.value = true
}
</script>

<style scoped>
a {
  text-decoration: underline;
}
</style>
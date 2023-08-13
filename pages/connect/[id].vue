<template>
  <h1>Has sido invitado a conectar con {{ parent.handle }}</h1>
  <Button type="submit" variant="primary" @click="makeConnection">Aceptar</Button>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

console.log('Código', route.params.id)

const { data: parent } = await useAsyncData('parent', async () => {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('invitation_token', route.params.id)
    .single()

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
}
</script>
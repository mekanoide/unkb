<template>
  <div v-if="user">
    <h1>Ya estás dentro, aquí no hay nada que ver</h1>
    <NuxtLink to="/">Ve a la página de Inicio</NuxtLink>
  </div>
  <div v-else class="Access">
    <h1>Registro</h1>
    <p>Usa esta invitación con responsabilidad.</p>
    <form @submit.prevent="handleSignUp">
      <TextField label="Nombre" v-model="handle" />
      <TextField label="Correo electrónico" type="email" v-model="email" />
      <TextField label="Contraseña" type="password" v-model="password" />
      <Button type="submit" variant="primary" size="large" :disabled="loading">Entrar</Button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'clear'
})

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { auth } = useSupabaseAuthClient()

const handle = ref(null)
const email = ref(null)
const password = ref(null)

const { data: parent, pending: parentPending } = await useAsyncData('parent', async () => {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('invitation_token', route.params.id)
    .single()

  return data
})

const handleSignUp = async () => {
  const { data: signupData, error: signupError } = await auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        handle: handle.value,
        avatar_url: ''
      }
    }
  })
  console.log('Usuario', user.value)
  if (signupError) {
    throw signupError
  }

  const { data: connectionData, error: connectionError } = await supabase
    .from('connection_requests')
    .upsert({
      target_id: parent.value.id,
      user_id: user.value.id
    })
  if (connectionError) {
    throw connectionError
  }
  router.push('/')
}
</script>

<style scoped>
a {
  text-decoration: underline;
}

.Access {
  display: grid;
  grid-auto-flow: row;
  gap: var(--spaceM);
  max-width: 480px;
  margin: auto;
}

form {
  display: grid;
  justify-content: stretch;
  gap: var(--spaceM);
}
</style>

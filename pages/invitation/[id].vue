<template>
  <div v-if="user">
    <h1>Ya estás dentro, aquí no hay nada que ver</h1>
    <NuxtLink to="/">Ve a la página de Inicio</NuxtLink>
  </div>
  <div v-else-if="error">
    <h1>{{ error }}</h1>
  </div>
  <div v-else class="Access">
    <h1>@{{ parent.handle }} te ha invitado a esto</h1>
    <p>Usa el privilegio con responsabilidad.</p>
    <form @submit.prevent="handleSignUp">
      <TextField
        label="Nombre"
        instructions="El nombre debe estar en minúsculas y contener solo caracteres alfanuméricos y guión bajo."
        :error="nameError"
        v-model="handle"
        @blur="validateName"
      />
      <TextField label="Correo electrónico" type="email" v-model="email" />
      <TextField label="Contraseña" type="password" v-model="password" />
      <Button type="submit" variant="primary" size="large">Entrar</Button>
    </form>
    <p>Ya tienes cuenta? <NuxtLink to="/access">Accede aquí</NuxtLink>.</p>
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

const nameError = ref(null)
const error = ref(null)

const validateName = async () => {
  const namePattern = /^[a-z0-9_]+$/
  if (!namePattern.test(handle.value)) {
    nameError.value =
      'El nombre debe estar en minúsculas y contener solo caracteres alfanuméricos y guión bajo.'
    return
  }
  const { data } = await supabase
    .from('users')
    .select('handle')
    .eq('handle', handle.value)
    .maybeSingle()

  if (data) {
    nameError.value = 'Lo siento, el nombre ya está pillado.'
    return
  }
  nameError.value = null
}

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
  if (signupError) {
    error.value = signupError
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

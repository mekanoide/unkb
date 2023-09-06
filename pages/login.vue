<script setup>
definePageMeta({
  layout: 'clear'
})

const client = useSupabaseClient()
const user = useSupabaseUser()

const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    console.log('Error!!!', error)
  }
}

watchEffect(
  async () => {
    if (user.value) {
      return navigateTo('/')
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="Login">
    <h1>Entrar</h1>
    <p>Si no tienes una cuenta, tendrás que pedir que alguien te invite.</p>
    <form @submit.prevent="handleLogin">
      <TextField
        label="Correo electrónico"
        type="email"
        autocomplete="email"
        v-model="email" />
      <TextField
        label="Contraseña"
        type="password"
        autocomplete="current-password"
        v-model="password" />
      <Button
        type="submit"
        variant="primary"
        >Entrar</Button
      >
    </form>
    <p>
      Tienes una invitación?
      <NuxtLink to="/register">Regístrate aquí!</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
a {
  text-decoration: underline;
}
.Login {
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

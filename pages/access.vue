<script setup>
definePageMeta({
  layout: 'clear'
})

const { auth } = useSupabaseAuthClient()
const user = useSupabaseUser()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref(null)

const handleSignIn = async () => {
  const { data, error } = await auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    errorMessage.value = error
  }
  return navigateTo('/')
}

watchEffect(async () => {
  if (user.value) {
    return navigateTo('/')
  }
})
</script>

<template>
  <div class="Access">
    <h1>Entrar</h1>
    <p>Si no tienes una cuenta, tendrás que pedir que alguien te invite.</p>
    <form @submit.prevent="handleSignIn">
      <TextField
        label="Correo electrónico"
        type="email"
        autocomplete="email"
        v-model="email" />
      <TextField
        label="Contraseña"
        type="password"
        autocomplete="current-password"
        v-model="password"
      />
      <Button type="submit" variant="primary" :disabled="loading">Entrar</Button>
    </form>
    <div v-if="errorMessage">ERROR!!! Tus credenciales probablemente no sean válidas.</div>
  </div>
</template>

<style scoped>
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
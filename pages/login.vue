<script setup>
definePageMeta({
  layout: 'clear'
})

const { auth } = useSupabaseClient()
const user = useSupabaseUser()

const email = ref('')
const password = ref('')
const pending = ref(false)

const handleLogin = async () => {
  pending.value = true
  const { error } = await auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    console.log('Error!!!', error)
  }
  pending.value = false
}

watchEffect(async () => {
  if (user.value) {
    return navigateTo('/')
  }
})
</script>

<template>
  <div class="Login">
    <h1>Entrar</h1>
    <p>Si tienes un codigo de invitacion, <NuxtLink to="/invitation">entra aqui</NuxtLink>.</p>
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
        :disabled="pending"
        >{{ pending ? '...' : 'Entrar' }}</Button
      >
    </form>
    <p>
      ¿Has olvidado tu contraseña? <a href="">Reestablece contraseña</a>.
    </p>
  </div>
</template>

<style scoped>
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

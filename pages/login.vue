<script setup>
definePageMeta({
  layout: 'clear'
})

const { auth } = useSupabaseClient()
const user = useSupabaseUser()

const authError = ref(false)

const email = ref('')
const password = ref('')
const pending = ref(false)

const handleLogin = async () => {
  pending.value = true
  const { data, error } = await auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    return error
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
      <p v-if="authError">{{ authError }}</p>
      <Button
        type="submit"
        :disabled="pending"
        >{{ pending ? '...' : 'Entrar' }}</Button
      >
    </form>
    <p>
      ¿Has olvidado tu contraseña?
      <NuxtLink to="/reset-password">Reestablece tu contraseña</NuxtLink>.
    </p>
    <p>Si no tienes cuenta, necesitas un enlace de invitación.</p>
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
</style>

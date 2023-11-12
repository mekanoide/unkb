<script setup>
definePageMeta({
  layout: 'clear',
  description: 'Restaura tu contraseña'
})

const { auth } = useSupabaseClient()
const user = useSupabaseUser()

const password = ref('')
const confirmPassword = ref('')
const changed = ref(false)

const valid = computed(() => {
  return (
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value
  )
})

const checkConfirmationPassword = () => {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
  }
}

const handleSubmit = async () => {
  if (!valid.value) {
    return
  }
  const { data, error } = await auth.updateUser({
    password: password.value
  })
  if (error) {
    console.log(error)
    return error
  }
  changed.value = true
}
</script>

<template>
  <section v-if="!changed">
    <h1>Renueva tu contraseña</h1>
    <form @submit.prevent="handleSubmit">
      <TextField
        label="Nueva contraseña"
        type="password"
        v-model="password" />
      <TextField
        label="Confirma tu contraseña"
        type="password"
        v-model="confirmPassword"
        @blur="checkConfirmationPassword" />
      <Button
        :disabled="!valid"
        type="submit"
        >Enviar</Button
      >
    </form>
  </section>
  <section v-else>
    <h1>Contraseña cambiada</h1>
    <NuxtLink to="/">Ir al inicio</NuxtLink>
  </section>
</template>

<style scoped>
section {
  max-width: 24rem;
  margin: auto;
  display: grid;
  gap: var(--spaceM);
}
</style>

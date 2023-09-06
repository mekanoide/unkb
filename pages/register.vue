<script setup>
definePageMeta({
  layout: 'clear'
})

import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const client = useSupabaseClient()
const user = useSupabaseUser()

const { register } = authStore

const handle = ref('')
const email = ref('')
const password = ref('')

const nameError = ref(null)
const error = ref(null)

const validateName = async () => {
  const namePattern = /^[a-z0-9_]+$/
  if (!namePattern.test(handle.value)) {
    return
  }
  const { data } = await client
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

const handleRegistry = async () => {
  const { data: invitation, error: invitationError } = await client
    .from('invitations')
    .select()
    .eq('target_email', email.value)
    .eq('used', false)
    .maybeSingle()

  await register(
    handle.value,
    email.value,
    password.value,
    invitation.inviter_id
  )
}

watch(
  user,
  (newValue) => {
    if (newValue) {
      return navigateTo('/')
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div v-if="user">
    <h1>Ya estás dentro, aquí no hay nada que ver</h1>
    <NuxtLink to="/">Ve a la página de Inicio</NuxtLink>
  </div>
  <div v-else-if="error">
    <h1>{{ error }}</h1>
  </div>
  <div
    v-else
    class="Register">
    <h1>Registro</h1>
    <p>
      Puedes unirte si tu correo está en la lista de invitaciones.
      <br />
      Usa este privilegio con responsabilidad.
    </p>
    <form @submit.prevent="handleRegistry">
      <TextField
        label="Nombre"
        instructions="El nombre debe estar en minúsculas y contener solo caracteres alfanuméricos y guión bajo."
        :error="nameError"
        :maxlength="32"
        placeholder="Algo en plan 'persona_tipo_666'"
        v-model="handle"
        @blur="validateName" />
      <TextField
        label="Correo electrónico"
        type="email"
        v-model="email" />
      <TextField
        label="Contraseña"
        type="password"
        v-model="password" />
      <Button
        type="submit"
        variant="primary"
        size="large"
        >Entrar</Button
      >
    </form>
    <p>Ya tienes cuenta? <NuxtLink to="/login">Accede aquí</NuxtLink>.</p>
  </div>
</template>

<style scoped>
a {
  text-decoration: underline;
}

.Register {
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

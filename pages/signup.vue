<script setup>
definePageMeta({
  layout: 'clear'
})

import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'
const store = useMainStore()
const authStore = useAuthStore()

const router = useRouter()
const client = useSupabaseClient()
const user = useSupabaseUser()

const { notifications } = storeToRefs(store)
const { signUp } = authStore

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

const handleSignUp = async () => {
  const { data: invitation, error: invitationError } = await client
    .from('invitations')
    .select()
    .eq('target_email', email.value)
    .eq('used', false)
    .maybeSingle()

  if (!invitation) {
    notifications.value.push({
      title: 'Error',
      message: 'Tu correo no está en la lista de invitados'
    })
    return
  }
  await signUp(handle.value, email.value, password.value, invitation.inviter_id)
}

watch(user, (newValue) => {
  if (newValue) {
    return navigateTo('/')
  }
})
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
    class="Signup">
    <h1>Registro</h1>
    <p>
      Puedes unirte si tu correo está en la lista de invitaciones.
      <br />
      Usa este privilegio con responsabilidad.
    </p>
    <form @submit.prevent="handleSignUp">
      <TextField
        label="Nombre"
        instructions="El nombre debe estar en minúsculas y contener solo caracteres alfanuméricos y guión bajo."
        :error="nameError"
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
    <p>Ya tienes cuenta? <NuxtLink to="/signin">Accede aquí</NuxtLink>.</p>
  </div>
</template>

<style scoped>
a {
  text-decoration: underline;
}

.Signup {
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

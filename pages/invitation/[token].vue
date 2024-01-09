<script setup>
import { useUserStore } from '@/stores/user'
const config = useRuntimeConfig()

definePageMeta({
  layout: 'clear'
})

const userStore = useUserStore()
const user = useSupabaseUser()
const client = useSupabaseClient()

const route = useRoute()
const token = route.params.token

const { checkHandle } = userStore

const handle = ref('')
const email = ref('')
const password = ref('')

const validHandle = ref(false)

const { data: invitation, error: errorInvitation } = await useFetch(
  `/api/invitations/${token}`
)

const validateName = async () => {
  const { data, error } = await checkHandle(handle.value)
  if (!data) {
    validHandle.value = false
    return
  }
  validHandle.value = true
}

const handleRegistry = async () => {
  const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        handle: handle.value.toLowerCase(),
        parent_id: invitation.value.id,
        token: token
      },
      emailRedirectTo: config.public.baseUrl
    }
  })
  if (error) {
    throw error
  }
  return navigateTo('/welcome')
}

watch(
  user,
  (newValue) => {
    if (newValue) {
      /* return navigateTo('/') */
    }
  },
  {
    immediate: false
  }
)
</script>

<template>
  <div
    v-if="invitation && !errorInvitation"
    class="Register">
    <h1>¡Hola!</h1>
    <p>
      Tienes la fortuna de haber sido invitada/o a <strong>UNKB</strong>. Usa
      este privilegio con responsabilidad.
    </p>
    <form @submit.prevent="handleRegistry">
      <TextField
        label="Nombre"
        type="text"
        :maxlength="16"
        placeholder="Puedes usar caracteres alfanuméricos y guión bajo"
        autocomplete="off"
        v-model="handle"
        @blur="validateName" />
      <TextField
        label="Correo electrónico"
        type="email"
        autocomplete="off"
        v-model="email" />
      <TextField
        label="Contraseña"
        type="password"
        autocomplete="off"
        v-model="password" />
      <Button
        type="submit"
        :disabled="!validHandle">
        Entrar
      </Button>
    </form>
    <p>Ya tienes cuenta? <NuxtLink to="/login">Accede aquí</NuxtLink>.</p>
  </div>
  <div
    v-else
    class="Register">
    <h1>Vaya</h1>
    <p>Esta invitación no es válida o está ya usada.</p>
    <p>
      Si ya tienes una cuenta prueba a
      <NuxtLink to="/login">acceder aquí</NuxtLink>.
    </p>
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
</style>

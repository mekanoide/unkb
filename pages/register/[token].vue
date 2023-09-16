<script setup>
definePageMeta({
  layout: 'clear'
})

const user = useSupabaseUser()

const route = useRoute()

const handle = ref('')
const email = ref('')
const password = ref('')

const nameError = ref(null)

const { data: invitation, error: errorInvitation } = await useFetch(
  `/api/v1/invitations/get/${route.params.token}`
)
email.value = invitation.value.target_email

const validateName = async () => {
  const { data } = await useFetch('/api/v1/auth/check-handle', {
    method: 'post',
    body: {
      handle: handle
    }
  })
  if (data.value) {
    nameError.value = data.value
  }
}

const handleRegistry = async () => {
  const { data } = await useFetch('/api/v1/auth/register', {
    method: 'post',
    body: {
      email: email,
      password: password,
      handle: handle,
      token: route.params.token
    }
  })
}

const valid = computed(() => {
  return !nameError && !passwordError
})

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
  <div v-else-if="errorInvitation">
    <h1>{{ errorInvitation }}</h1>
  </div>
  <div
    v-else
    class="Register">
    <h1>¡Hola!</h1>
    <p>
      Tienes la fortuna de haber sido invitada/o a <strong>UNKB</strong>. Usa
      este privilegio con responsabilidad.
    </p>
    <form @submit.prevent="handleRegistry">
      <TextField
        label="Nombre"
        :error="nameError"
        :maxlength="32"
        placeholder="Caracteres alfanuméricos y guión bajo"
        v-model="handle"
        @blur="validateName" />
      <TextField
        label="Correo electrónico"
        type="email"
        :modelValue="email"
        disabled />
      <TextField
        label="Contraseña"
        type="password"
        v-model="password" />
      <Button type="submit" :disabled="!valid">Entrar</Button>
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

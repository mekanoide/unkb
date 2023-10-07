<script setup>
definePageMeta({
  layout: 'clear'
})

const user = useSupabaseUser()

const route = useRoute()

const handle = ref('')
const email = ref('')
const password = ref('')

const nameError = ref(true)
const emailError = ref(true)

const { data: invitation, error: errorInvitation } = await useFetch(
  `/api/v1/invitations/get/${route.params.token}`
)

const validateName = async () => {
  const { data } = await useFetch('/api/v1/auth/check-handle', {
    method: 'post',
    body: {
      handle: handle
    }
  })
  if (data.value) {
    nameError.value = data.value
  } else {
    nameError.value = null
  }
}

const validateEmail = async () => {
  if (email.value !== invitation.value.target_email) {
    emailError.value = 'El correo electrónico no coincide con la invitación'
  } else {
    emailError.value = null
  }
}

const handleRegistry = async () => {
  const { data } = await useFetch('/api/v1/auth/register', {
    method: 'post',
    body: {
      parent: invitation.value.inviter_id,
      email: email.value,
      password: password.value,
      handle: handle.value,
      token: route.params.token
    }
  })
  if (data) {
    return navigateTo('/')
  }
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
        :error="emailError"
        type="email"
        v-model="email"
        @blur="validateEmail" />
      <TextField
        label="Contraseña"
        type="password"
        v-model="password" />
      <Button type="submit" :disabled="nameError || emailError">Entrar</Button>
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

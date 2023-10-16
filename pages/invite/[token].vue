<script setup>
const config = useRuntimeConfig()

definePageMeta({
  layout: 'clear'
})

const user = useSupabaseUser()
const client = useSupabaseClient()

const route = useRoute()
const token = route.params.token

const handle = ref('')
const email = ref('')
const password = ref('')

const errorName = ref(true)

const { data: invite, error: errorInvite } = await useFetch(`/api/v1/invites/${token}`)

const validateName = async () => {
  const { data, error } = await useFetch('/api/v1/auth/check-handle', {
    method: 'post',
    body: {
      handle: handle.value
    }
  })
  if (data.value) {
    errorName.value = true
  } else {
    errorName.value = false
  }
}

const handleRegistry = async () => {
  console.log('handleRegistry', email.value, password.value, handle.value, invite.value.inviter_id)
  const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        handle: handle.value.toLowerCase(),
        parent_id: invite.value.inviter_id,
        token: token
      },
      emailRedirectTo: config.public.baseUrl
    }
  })
  if (!error) {
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
  <div
    v-if="invite && !errorInvite"
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
        placeholder="Caracteres alfanuméricos y guión bajo"
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
        :disabled="errorName"
        >Entrar</Button
      >
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

form {
  display: grid;
  justify-content: stretch;
  gap: var(--spaceM);
}
</style>

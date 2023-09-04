<script setup>
const { auth } = useSupabaseClient()
const user = useSupabaseUser()

const email = ref('')
const password = ref('')

const handleSignIn = async () => {
  const { error } = await auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    console.log('Error!!!', error)
  }
}

watch(user, (newValue) => {
  if (user.value) {
    return navigateTo('/')
  }
})

definePageMeta({
  layout: 'clear'
})
</script>

<template>
  <div class="Signin">
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
      <Button type="submit" variant="primary">Entrar</Button>
    </form>
    <p>Tienes una invitación? <NuxtLink to="/signup">Entra aquí!</NuxtLink></p>
  </div>
</template>

<style scoped>
a {
  text-decoration: underline;
}
.Signin {
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
<template>
  <div class="Access">
    <h1>Entrar</h1>
    <p>Si no tienes una cuenta, tendrás que pedir que alguien te invite.</p>
    <form @submit.prevent="handleSignIn">
      <TextField
        label="Correo electrónico"
        type="email"
        v-model="email" />
      <TextField
        label="Contraseña"
        type="password"
        v-model="password"
      />
      <Button type="submit" variant="primary" :disabled="loading">Entrar</Button>
    </form>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/main'

definePageMeta({
  layout: 'clear'
})

const user = useSupabaseUser()
const { auth } = useSupabaseAuthClient()
const router = useRouter()
const store = useMainStore()

const handle = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

const activeTab = ref('signin')

const handleSignIn = async () => {
  const { data, error } = await auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    throw error
  }
  navigateTo('/')
}

watchEffect(() => {
  if (user.value) {
    navigateTo('/')
  }
})
</script>

<style scoped>
.Access {
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
<template>
  <NuxtLayout>
    <div class="Access">
        <TabMenu>
          <Tab :selected="activeTab === 'signin'" @click="activeTab = 'signin'">Entrar</Tab>
          <Tab :selected="activeTab === 'signup'" @click="activeTab = 'signup'">Registrarse</Tab>
        </TabMenu>
        <div v-if="activeTab === 'signin'">
          <h1>Entrar</h1>
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
        <div v-if="activeTab === 'signup'">
          <h1>Registro</h1>
          <form @submit.prevent="handleSignUp">
            <TextField label="Nombre" v-model="handle" />
            <TextField
              label="Correo electrónico"
              type="email"
              v-model="email"
            />
            <TextField
              label="Contraseña"
              type="password"
              v-model="password"
            />
            <Button type="submit" variant="primary" :disabled="loading">Entrar</Button>
          </form>
        </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: 'clear'
})

const user = useSupabaseUser()
const { auth } = useSupabaseAuthClient()
const router = useRouter()

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

const handleSignUp = async () => {
  const { data, error } = await auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        handle: handle.value,
        avatar_url: ''
      }
    }
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
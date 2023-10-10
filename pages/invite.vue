<script setup>
import { useFetch } from '@vueuse/core';

definePageMeta({
  layout: 'clear'
})

const user = useSupabaseUser()

const token = ref('')

const validateToken = async () => {
  const { data } = await useFetch('/api/v1/invitations/validate', {
    method: 'post',
    body: {
      token: token.value
    }
  })
  console.log('Válido?', data.value)
  if (data) {
    navigateTo('/register')
  }
}
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
      ¿Tienes un código de invitacion?
    </p>
    <form @submit.prevent="validateToken">
      <TextField
        label="Código de invitacion"
        :maxlength="32"
        placeholder="Introduce el codigo"
        v-model="token" />
      <Button type="submit">Validar</Button>
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

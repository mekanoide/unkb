<script setup>
definePageMeta({
  layout: 'clear'
})

const { auth } = useSupabaseClient()
const config = useRuntimeConfig()

const email = ref('')
const validEmail = ref(false)
const sent = ref(false)

const handleSubmit = async () => {
  const { data, error } = await auth.resetPasswordForEmail(email.value, {
    redirectTo: `${config.public.baseUrl}/update-password`
  })
  if (error) {
    return error
  }
  sent.value = true
}

const validateEmail = () => {
  const re = /\S+@\S+\.\S+/
  validEmail.value = re.test(email.value)
}
</script>
<template>
  <div v-if="!sent">
    <h1>Reestablece contraseña</h1>
    <p>
      Introduce tu correo electrónico y te enviaremos un enlace para
      reestablecer tu contraseña.
    </p>
    <form @submit.prevent="handleSubmit">
      <TextField
        label="Correo electrónico"
        type="email"
        v-model="email"
        @input="validateEmail" />
      <Button
        :disabled="!validEmail"
        type="submit"
        >Enviar</Button
      >
    </form>
  </div>
  <div v-else><h2>Comprueba tu correo!</h2></div>
</template>

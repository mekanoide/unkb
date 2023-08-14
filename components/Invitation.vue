<template>
  <section>
    <h3>Invita</h3>
    <p>Conecta con tu peñita pasándoles este enlace:</p>
    <button @click="copyTokenToClipboard">
      {{ invitationLink }}
      <Transition name="fade">
        <div v-if="copied" class="copied">Enlace copiado al portapapeles!</div>
      </Transition>
    </button>
  </section>
</template>

<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient()
const config = useRuntimeConfig()

const copied = ref(false)

const { data: profile, error } = await useAsyncData('profile', async () => {
  const { data } = await client.from('users').select('*').eq('id', user.value.id).single()

  return data
})

const invitationLink = computed(() => {
  return `${config.public.baseUrl}/invitation/${profile.value.invitation_token}`
})

const copyTokenToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(invitationLink.value)
    // state.showNotification('Enlace copiado al portapapeles')
  } catch (err) {
    console.error('Error al copiar el enlace:', err)
  }
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 3000)
}
</script>

<style scoped>
section {
  display: grid;
  gap: var(--spaceS);
}

button {
  padding: var(--spaceS) var(--spaceM);
  border: 1px dashed black;
  border-radius: var(--corner);
  position: relative;
}

.copied {
  position: absolute;
  inset: 0;
  background-color: black;
  color: yellow;
  font-weight: bold;
  display: grid;
  place-content: center;
  border-radius: var(--corner);
}
</style>

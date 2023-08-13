<template>
  <form @submit.prevent="handlePost">
    <textarea v-model="content" rows="4" cols="50" maxlength="1024" placeholder="Escribe tu movida (puedes usar Markdown!!!)"></textarea>
    <footer><Button type="submit" variant="primary">Enviar</Button><span>{{ wordCount }}</span></footer>
  </form>
</template>

<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient()

const emit = defineEmits(['post'])

const content = ref('')

const wordCount = computed(() => {
  return `${content.value.length} / 1024`
})

const handlePost = () => {
  emit('post', content.value)
  content.value = ''
}
</script>

<style scoped>
form {
  display: grid;
  grid-auto-flow: row;
  gap: var(--spaceS);
}

textarea {
  font-size: var(--fontL);
}

footer {
  display: grid;
  grid-auto-flow: column;
  align-content: start;
  justify-content: space-between;
}
</style>
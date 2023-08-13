<template>
  <article v-html="mdContent"></article>
</template>

<script setup>
import MarkdownIt from 'markdown-it'
import { useMainStore } from '@/stores/main'

const md = new MarkdownIt()
const store = useMainStore()

const props = defineProps({
  content: {
    type: [Object, String],
    required: true
  }
})

const mdContent = computed(() => {
  const contentWithMentions = props.content.replace(/@(\w+)/g, (match, handle) => {
    const user = store.getConnection(handle)
    if (user) {
      // Generar enlace al perfil del usuario
      return `<a href="/user/${user.id}">@${user.username}</a>`
    }
    return match
  })

  // Analizar el contenido Markdown y convertirlo a HTML
  return md.render(contentWithMentions)
})
</script>

<style scoped>
article {
  padding: var(--spaceS) 0;
  font-size: var(--fontL);
  display: grid;
  gap: var(--spaceS);
}
</style>

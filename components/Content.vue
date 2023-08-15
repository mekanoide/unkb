<template>
  <article v-html="mdContent"></article>
  <div v-if="previewData">HEY {{ previewData }}</div>
</template>

<script setup>
import MarkdownIt from 'markdown-it'
import { useMainStore } from '@/stores/main'

const md = new MarkdownIt()
const store = useMainStore()
const previewData = ref(null)

const props = defineProps({
  content: {
    type: [Object, String],
    required: true
  }
})

const mdContent = computed(() => {
  /*   const contentWithMentions = props.content.replace(/@(\w+)/g, (match, handle) => {
    const user = store.getConnection(handle)
    if (user) {
      // Generar enlace al perfil del usuario
      return `<a href="/user/${user.id}">@${user.username}</a>`
    }
    return match
  }) */

  return md.render(props.content)
})

const previewUrl = async (str) => {
  const linkRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  const matches = str.match(linkRegex)

  if (matches) {
    for (const match of matches) {
      const url = match.match(linkRegex)[0]
      console.log('El enlace es', url)
      const { data: preview } = await useFetch(url, {
        headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' }
      })
      console.log(preview.value)
      previewData.value = preview
    }
  }
}

onMounted(() => {
  previewUrl(props.content)
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

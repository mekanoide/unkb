<template>
  <article v-html="modContent"></article>
</template>

<script setup>
import MarkdownIt from 'markdown-it'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const { content } = toRefs(props)
const modContent = ref('')
const preview = ref(null)

const parseMentions = async (txt) => {
  let mod = txt
  const client = useSupabaseClient()

  const mentionRegex = /@([a-z0-9_]+)/g
  const matches = mod.match(mentionRegex)

  if (matches) {
    for (const match of matches) {
      const username = match.substring(1) // Elimina el "@" del inicio
      const { data: userData } = await client
        .from('users')
        .select()
        .textSearch('handle', `${username}`)
      const user = userData[0]
      if (user) {
        const userLink = `[@${username}](/${username})`
        mod = mod.replace(match, userLink)
      }
    }
  }
  return mod
}

const parseLinks = (txt) => {
  let mod = txt
  const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  const matches = mod.match(linkRegex)

  if (matches) {
    for (const match of matches) {
      const link = `<a href="${match}" target="_blank">${match}</a>`
      mod = mod.replace(match, link)
    }
  }
  return mod
}


const parseMarkdown = (txt) => {
  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
  return md.render(txt)
}


/* TODO: let's see how I can do this */
/* const previewLink = async (url) => {
  const apiUrl = `https://jsonlink.io/api/extract?url=${url}`
  console.log('Link', apiUrl)
  const { data, error } = await $fetch(apiUrl)
  if (error) {
    throw error
  }
  return data
}
 */
const parseContent = async (txt) => {
  let processedContent = txt
  processedContent = await parseMentions(processedContent)
  // processedContent = parseLinks(processedContent)
  processedContent = parseMarkdown(processedContent)
  modContent.value = processedContent
}

parseContent(props.content)
// preview.value = previewLink('https://anaga.dev')

watch(content, async (newContent, oldContent) => {
  parseContent(newContent)
})
</script>

<style scoped>
article {
  padding: 1em 0;
  font-size: var(--fontL);
  display: grid;
  gap: 1em;
  overflow-wrap: anywhere;
  white-space: balance;
}
</style>

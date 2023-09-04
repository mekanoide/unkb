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
        .single()
      if (userData) {
        const userLink = `[@${userData.handle}](/${userData.handle})`
        mod = mod.replace(match, userLink)
      }
    }
  }
  return mod
}

const getFirstLink = (txt) => {
  let mod = txt
  let links = []
  const linkRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  const matches = mod.match(linkRegex)
  if (matches) {
    for (const match of matches) {
      links.push(match)
    }
    return links[0]
  }
}

const parseMarkdown = (txt) => {
  const md = new MarkdownIt({
    html: false,
    breaks: true,
    linkify: true
  })
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    return `<a href="${token.attrs[0][1]}" target="_blank">`
  }
  return md.render(txt)
}

/* TODO: let's see how I can do this */
/* const previewLink = async (url) => {
  const apiUrl = `https://jsonlink.io/api/extract?url=${url}`
  console.log('Link', apiUrl)
  const { data, error } = await $fetch(apiUrl)
  return data
}
 */
const parseContent = async (txt) => {
  let processedContent = txt
  processedContent = await parseMentions(processedContent)
  /* processedContent = parseLinks(processedContent) */
  processedContent = parseMarkdown(processedContent)
  modContent.value = processedContent
}

parseContent(props.content)

watch(content, async (newContent) => {
  parseContent(newContent)
})
</script>

<template>
  <article v-html="modContent"></article>
</template>

<style scoped>
article {
  max-width: calc(100vw - (var(--spaceM) * 2));
  padding: 1em 0;
  font-size: var(--fontL);
  display: grid;
  gap: 1em;
  overflow-wrap: anywhere;
  white-space: balance;
}
</style>

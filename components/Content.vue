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
        const userLink = `[@${username}](/user/${user.id})`
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
    html: true
  })
  return md.render(txt)
}

/* const previewUrl = async (str) => {
  const linkRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  const matches = str.match(linkRegex)

  if (matches) {
    for (const match of matches) {
      const url = match.match(linkRegex)[0]
      console.log(data)
      previewData.value = getLinkPreviewData
    }
  }
} */
const parseContent = async (txt) => {
  let processedContent = txt
  processedContent = await parseMentions(processedContent)
  processedContent = parseLinks(processedContent)
  processedContent = parseMarkdown(processedContent)
  modContent.value = processedContent
}

parseContent(props.content)

watch(content, async (newContent, oldContent) => {
  parseContent(newContent)
})
</script>

<style scoped>
article {
  padding: var(--spaceS) 0;
  font-size: var(--fontL);
  display: grid;
  gap: var(--spaceS);
  overflow-wrap: anywhere;
  white-space: balance;
}
</style>

<script setup>
import MarkdownIt from 'markdown-it'
import mditHljs from 'markdown-it-highlightjs'
import { usePostStore } from '@/stores/post'
const postStore = usePostStore()

const { getMentionsFromPost } = postStore

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

  const mentions = await getMentionsFromPost(txt)
  console.log('Menciones!!!', mentions)

  if (mentions) {
    for (const mention of mentions) {
      const userLink = `[${mention.handle}](/${mention.handle})`
      mod = mod.replace(mention.handle, userLink)
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
    linkify: true,
    highlights: true
  })
  md.use(mditHljs, {
    inline: true,
    auto: true,
    code: true
  })
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    console.log('token', token)
    const linkRegex = /https?:/g
    const match = token.attrs[0][1].match(linkRegex)
    if (match) {
      return `<a href="${token.attrs[0][1]}" target="_blank">`
    } else {
      return `<a href="${token.attrs[0][1]}">`
    }
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

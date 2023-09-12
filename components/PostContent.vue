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
  if (mentions) {
    for (const mention of mentions) {
      const userLink = `**[${mention.handle}](/user/${mention.handle})**`
      mod = mod.replace(mention.handle, userLink)
    }
  }
  return mod
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

const parseContent = async (txt) => {
  let processedContent = txt
  processedContent = await parseMentions(processedContent)
  processedContent = parseMarkdown(processedContent)
  modContent.value = processedContent
}

const getLinks = async (txt) => {
  /* TODO: It needs to capture links and try to fetch their metadata */
  return something
}

parseContent(props.content)

watch(content, async (newContent) => {
  parseContent(newContent)
  getLinks(newContent)
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

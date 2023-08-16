<template>
  <article v-html="mdContent"></article>
</template>

<script setup>
import MarkdownIt from 'markdown-it'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const md = new MarkdownIt({
  html: true
})
const { content } = toRefs(props)

content.value = await parseMentions(content.value)
content.value = await parseLinks(content.value)

const mdContent = computed(() => {
  return md.render(content.value)
})

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

onMounted(() => {
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

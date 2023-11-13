<script setup>
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

const parseMentions = (txt) => {
  let mod = txt

  const mentions = getMentionsFromPost(txt)
  if (mentions) {
    for (const mention of mentions) {
      const userLink = `**[${mention}](/user/${mention})**`
      mod = mod.replace(mention, userLink)
    }
  }
  return mod
}

const modifyContent = (txt) => {
  let mod = txt
  mod = parseMentions(mod)
  mod = useMarkdown(mod)

  return mod
}

onMounted(() => {
  modContent.value = modifyContent(props.content)
})

watch(content, (newValue) => {
  modContent.value = modifyContent(newValue)
})
</script>

<template>
  <article v-html="modContent"></article>
</template>

<style scoped>
article {
  max-width: calc(100vw - (var(--spaceM) * 2));
  display: grid;
  gap: var(--spaceM);
  overflow-wrap: anywhere;
}
</style>

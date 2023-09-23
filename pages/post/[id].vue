<script setup>
definePageMeta({
  middleware: ['auth']
})

import { usePostStore } from '@/stores/post'
import { useEditionStore } from '@/stores/edition'

const postStore = usePostStore()
const editionStore = useEditionStore()
const route = useRoute()

const { editionOK } = storeToRefs(editionStore)
const { createReply } = postStore

const { data: post, refresh: refreshPost } = await useFetch(
  `/api/v1/posts/${route.params.id}`
)

const { data: replies, refresh: refreshReplies } = await useFetch(
  `/api/v1/replies/${route.params.id}`
)

const buildTree = (responses, parent_id = null) => {
  const tree = []
  for (const response of responses) {
    if (response.parent_id === parent_id) {
      const children = buildTree(responses, response.id)
      if (children.length) {
        response.children = children
      }
      tree.push(response)
    }
  }
  return tree
}

const repliesTree = computed(() => {
  if (!replies.value) return null
  return buildTree(replies.value)
})

const handleReply = async (content, scope, parent) => {
  await createReply(route.params.id, content)
  refreshReplies()
}

watch(editionOK, async (newValue) => {
  if (newValue) {
    refreshPost()
    editionOK.value = false
  }
})

useHead({
  meta: [
    {
      name: 'description',
      content: post.value?.content
    }
  ]
})
</script>

<template>
  <Post
    :post="post"
    :key="post.id"
    single />
  <PostEditor
    id="write-reply"
    :rows="2"
    postType="reply"
    @post="handleReply"
    placeholder="Escribe una respuesta" />
  <ul v-if="replies && replies.length > 0">
    <li v-for="reply in repliesTree">
      <Reply
        :data="reply"
        :key="reply.id"
        @deleted="refreshReplies" />
    </li>
  </ul>
  <EmptyState
    v-else
    message="No hay respuestas" />
</template>

<style scoped></style>

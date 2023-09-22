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

const handleReply = async (content, scope) => {
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
    <li v-for="reply in replies">
      <Reply
        :data="reply"
        :key="reply.id"
        @deleted="repliesRefresh" />
    </li>
  </ul>
  <EmptyState
    v-else
    message="No hay respuestas" />
</template>

<style scoped></style>

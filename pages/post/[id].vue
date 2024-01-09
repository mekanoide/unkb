<script setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/stores/posts'
import { useEditionStore } from '@/stores/edition'

const user = useSupabaseUser()
const postsStore = usePostsStore()
const editionStore = useEditionStore()
const route = useRoute()
const postId = route.params.id

const { editionOK } = storeToRefs(editionStore)
const { fetchPostWithReplies, createReply } = postsStore
const { activePost, activeReplies, repliesTree } = storeToRefs(postsStore)

const handleReply = async (content) => {
  await createReply(postId, content, null)
  refreshReplies()
}

watch(editionOK, async (newValue) => {
  if (newValue) {
    fetchPostWithReplies(postId)
    editionOK.value = false
  }
})

useHead({
  meta: [
    {
      property: 'og:description',
      content: activePost.value?.content
    },
    {
      name: 'description',
      content: activePost.value?.content
    }
  ]
})

await fetchPostWithReplies(postId)
</script>

<template>
  <Post
    :data="activePost"
    :key="activePost.id"
    single />
  <PostEditor
    v-if="user"
    id="write-reply"
    :rows="2"
    postType="reply"
    @post="handleReply"
    placeholder="Escribe una respuesta" />
  <ul v-if="activeReplies && activeReplies.length > 0">
    <li v-for="reply in repliesTree">
      <Reply
        :data="reply"
        :key="reply.id" />
    </li>
  </ul>
  <EmptyState
    v-else
    message="No hay respuestas" />
</template>

<style scoped></style>

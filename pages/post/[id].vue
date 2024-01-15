<script setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/stores/posts'
import { useEditionStore } from '@/stores/edition'

const user = useSupabaseUser()
const client = useSupabaseClient()
const postsStore = usePostsStore()
const editionStore = useEditionStore()
const route = useRoute()
const postId = route.params.id

const { fetchPostWithReplies, fetchPost, createReply } = postsStore
const { currentPost, currentReplies, repliesTree, pendingPosts } =
  storeToRefs(postsStore)

const handleReply = async (content) => {
  await createReply(postId, content, null)
  refreshReplies()
}

useHead({
  meta: [
    {
      property: 'og:description',
      content: currentPost.value?.content
    },
    {
      name: 'description',
      content: currentPost.value?.content
    }
  ]
})

onMounted(() => {
  fetchPostWithReplies(postId)
})
</script>

<template>
  <Post
    v-if="currentPost"
    :data="currentPost"
    :key="currentPost.id"
    single />
  <PostEditor
    v-if="user"
    id="write-reply"
    :rows="2"
    postType="reply"
    @post="handleReply"
    placeholder="Escribe una respuesta" />
  <ul v-if="currentReplies && currentReplies.length > 0">
    <li v-for="reply in repliesTree">
      <Reply
        :data="reply"
        :key="reply.id" />
    </li>
  </ul>
  <EmptyState
    v-if="!pendingPosts && currentReplies.length === 0"
    message="No hay respuestas" />
  <LoadingContent v-if="pendingPosts" />
</template>

<style scoped></style>

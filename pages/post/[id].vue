<script setup>
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/post'
import { useEditionStore } from '@/stores/edition'

const user = useSupabaseUser()
const postStore = usePostStore()
const editionStore = useEditionStore()
const route = useRoute()
const postId = route.params.id

const { editionOK } = storeToRefs(editionStore)
const { createReply } = postStore

const { data: post, refresh: refreshPost } = await useFetch(
  `/api/v1/posts/${postId}`
)

const { data: replies, refresh: refreshReplies } = await useFetch(
  `/api/v1/replies/${postId}`
)

const buildTree = (responses, parentId = null) => {
  const tree = []
  for (const response of responses) {
    if (response.parent_id === parentId) {
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

const handleReply = async (content) => {
  await createReply(postId, content, null)
  refreshReplies()
}

watch(editionOK, async (newValue) => {
  if (newValue) {
    refreshPost()
    refreshReplies()
    editionOK.value = false
  }
})

useHead({
  meta: [
    {
      property: 'og:description',
      content: post.value?.content
    },
    {
      name: 'description',
      content: post.value?.content
    }
  ]
})
</script>

<template>
  <Post
    :data="post"
    :key="post.id"
    single />
  <PostEditor
    v-if="user"
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
        @refresh="refreshReplies" />
    </li>
  </ul>
  <EmptyState
    v-else
    message="No hay respuestas" />
</template>

<style scoped></style>

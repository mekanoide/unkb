<script setup>
definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser()

import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'
const store = useMainStore()
const postStore = usePostStore()
const route = useRoute()

const { showPopover } = storeToRefs(store)
const { postBeingEditedId } = storeToRefs(postStore)
const { createReply, startPostEdition, deletePost } = postStore

const { data: post, refresh: refreshPost } = await useFetch(
  `/api/v1/posts/${route.params.id}`
)

const { data: replies, refresh: refreshReplies } = await useFetch(
  `/api/v1/replies/${route.params.id}`
)

const handleEdit = () => {
  startPostEdition(post.value.id, post.value.content)
  showPopover.value = null
}

const handleDelete = async () => {
  await deletePost(props.post.id)
  emit('deleted')
  showPopover.value = null
}

const handleReply = async () => {
  await createReply(route.params.id)
  repliesRefresh()
}
</script>

<template>
  <Post
    :post="post"
    :key="post.id"
    single />
  <PostEditor
    id="write-reply"
    :rows="2"
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
  <EditPost
    v-if="postBeingEditedId"
    @edited="repliesRefresh" />
</template>

<style scoped></style>

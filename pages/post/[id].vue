<script setup>
/* Middleware */
definePageMeta({
  middleware: ['auth', 'params']
})

import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'
const store = useMainStore()
const postStore = usePostStore()
const route = useRoute()

const { paramsId } = storeToRefs(store)
const { postBeingEdited } = storeToRefs(postStore)
const { fetchPost, fetchReplies, createReply } = postStore

const {
  data: post,
  pending: postPending,
  error: postError
} = useAsyncData(() => fetchPost(paramsId.value))

const {
  data: replies,
  pending: repliesPending,
  error: repliesError,
  refresh: repliesRefresh
} = useAsyncData(() => fetchReplies(paramsId.value))

const handleReply = async () => {
  await createReply(route.params.id)
  repliesRefresh()
}

const date = computed(() => formatDate(post.value.created_at))
</script>

<template>
  <div class="Post">
    <div class="post">
      <header>
        <User
          :data="post?.users"
          size="large" />
      </header>
      <PostContent :content="post.content" />
      <time :datetime="date">{{ date }}</time>
    </div>
    <PostEditor
      id="write-reply"
      :rows="2"
      @post="handleReply"
      placeholder="Escribe una respuesta" />
    <ul v-if="replies && replies.length > 0">
      <Post
        v-for="reply in replies"
        reply
        :post="reply"
        :key="reply.id"
        @deleted="repliesRefresh" />
    </ul>
    <EmptyState
      v-else
      message="No hay respuestas" />
    <EditReply
      v-if="postBeingEdited"
      @edited="repliesRefresh" />
  </div>
</template>

<style scoped>
header {
  display: flex;
  gap: var(--spaceS);
  align-items: baseline;
}

.Post {
  display: grid;
  gap: var(--spaceL);
}
</style>

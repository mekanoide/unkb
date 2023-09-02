<script async setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'
const store = useMainStore()
const postStore = usePostStore()
const route = useRoute()

const { postBeingEdited } = storeToRefs(postStore)
const { fetchPost, fetchReplies, createReply } = postStore

const {
  data: post,
  pending: postPending,
  error: postError
} = useAsyncData(() => fetchPost(route.params.id))

const {
  data: replies,
  pending: repliesPending,
  error: repliesError,
  refresh: repliesRefresh
} = useAsyncData(() => fetchReplies(route.params.id))

const handleReply = async () => {
  await createReply(route.params.id)
  repliesRefresh()
}

const date = computed(() => formatDate(post.value.created_at))

/* Middleware */
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <div class="Post">
    <div class="post">
      <header>
        <NuxtLink to="/">
          <Icon
            name="ph:arrow-left-bold"
            size="1.5rem" />
        </NuxtLink>
        <User
          :data="post?.users"
          size="large" />
      </header>
      <PostContent :content="post.content" />
      <time :datetime="date">{{ date }}</time>
    </div>
    <PostEditor
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
  gap: var(--spaceM);
  align-items: baseline;
}

.Post {
  display: grid;
  gap: var(--spaceL);
}
</style>

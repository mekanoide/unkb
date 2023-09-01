<script async setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'
const store = useMainStore()
const postStore = usePostStore()
const route = useRoute()

const { postBeingEdited } = storeToRefs(postStore)
const { fetchPost, fetchReplies, createReply } = postStore
const id = route.params.id

const { data: post, error: postError } = useAsyncData(() => fetchPost(id))
const {
  data: replies,
  error: repliesError,
  refresh: repliesRefresh
} = useAsyncData(() => fetchReplies(id))

const handleReply = async () => {
  await createReply(id)
  repliesRefresh()
}

const date = computed(() => formatDate(post.value.created_at))

/* Middleware */
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div class="post">
    <header>
      <span>
        <User :data="post?.users" size="large" />
      </span>
      <NuxtLink to="/"><Icon name="carbon:close" size="2.5rem" /></NuxtLink>
    </header>
    <time :datetime="date">{{ date }}</time>
    <PostContent :content="post.content" />
  </div>
  <PostEditor :rows="2" @post="handleReply" placeholder="Escribe una respuesta" />
  <ul v-if="replies && replies.length > 0">
    <Post v-for="reply in replies" reply :post="reply" :key="reply.id" @deleted="repliesRefresh" />
  </ul>
  <EmptyState v-else message="No hay respuestas" />
  <EditReply v-if="postBeingEdited" @edited="repliesRefresh" />
</template>

<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}
</style>

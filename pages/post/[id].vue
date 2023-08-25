<script setup>
definePageMeta({
  middleware: ['auth']
})

import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
const store = useMainStore()
const route = useRoute()

const { postBeingEdited } = storeToRefs(store)
const { fetchPost, fetchReplies, createReply } = store
const id = route.params.id

const { data: post, error: postError } = useAsyncData(() => fetchPost(id))
const { data: replies, error: repliesError, refresh: repliesRefresh } = useAsyncData(() => fetchReplies(id))

const handleReply = async () => {
  await createReply(id)
  repliesRefresh()
}

const date = computed(() => formatDate(post.value.created_at))
</script>

<template>
  <div class="post">
    <EditReply v-if="postBeingEdited" @edited="repliesRefresh" />
    <header>
      <span>
        <User :data="post.users" size="large" />
      </span>
      <NuxtLink to="/"><Icon name="carbon:close" size="2.5rem" @click="" /></NuxtLink>
    </header>
    <time :datetime="date">{{ date }}</time>
    <PostContent :content="post.content" />
  </div>
  <PostEditor :rows="2" @post="handleReply" placeholder="Escribe una respuesta" />
  <div>
    <Posts>
      <Post v-for="reply in replies" reply :post="reply" :key="reply.id" @deleted="repliesRefresh" />
    </Posts>
    <EmptyState v-if="replies.length === 0" message="No hay respuestas" />
  </div>
</template>

<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}
</style>

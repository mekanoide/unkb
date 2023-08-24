<script setup>
definePageMeta({
  middleware: ['auth']
})

import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
const store = useMainStore()
const route = useRoute()

const {post, posts } = storeToRefs(store)
const { fetchPost, fetchReplies, createReply } = store
const id = route.params.id

const handlePost = async () => {
  await createReply(id)
  await fetchReplies(id)
}

const refresh = async () => {
  await fetchReplies(route.params.id)
}

const date = computed(() => formatDate(post.created_at))

await fetchPost(id)
await fetchReplies(id)
</script>

<template>
  <div class="post">
    <header>
      <span>
        <User :data="post.users" size="large" />
      </span>
      <NuxtLink to="/"><Icon name="carbon:close" size="2.5rem" @click="" /></NuxtLink>
    </header>
    <time :datetime="date">{{ date }}</time>
    <PostContent :content="post.content" />
  </div>
  <PostEditor :rows="2" @post="handlePost" placeholder="Escribe una respuesta" />
  <div>
    <Posts>
      <Post v-for="post in posts" reply :post="post" @deleted="refresh" />
    </Posts>
    <EmptyState v-if="posts.length === 0" message="No hay respuestas" />
  </div>
</template>

<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}
</style>

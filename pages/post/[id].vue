<script setup>
definePageMeta({
  middleware: ['auth']
})

import { useMainStore } from '@/stores/main'
const store = useMainStore()
const route = useRoute()
const client = useSupabaseClient()

const { fetchReplies, createReply } = store

/* Fetch post */
const {
  data: post,
  error: postError,
  refresh: postRefresh
} = await client.from('posts').select('*, users(id, handle)').eq('id', route.params.id).single()

const {
  data: replies,
  error: repliesError,
  refresh: repliesRefresh
} = await useAsyncData('replies', async () => {
  const data = await fetchReplies(route.params.id)
  return data
})

const handlePost = async () => {
  await createReply(route.params.id)
  repliesRefresh()
}

const date = computed(() => formatDate(post.created_at))
</script>

<template>
  <div>
    <User :user="post.users" /> <time :datetime="date">{{ date }}</time>
    <PostContent :content="post.content" />
  </div>
  <PostEditor :rows="2" @post="handlePost" placeholder="Escribe una respuesta" />
  <div>
    <Posts>
      <Post v-for="post in replies" reply :post="post" @deleted="repliesRefresh" />
    </Posts>
    <EmptyState v-if="replies?.length === 0" message="No hay respuestas" />
  </div>
</template>

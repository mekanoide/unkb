<template>
  <div>
    <User :user="post.users" /> <time :datetime="date">{{ date }}</time>
    <PostContent :content="post.content" />
  </div>
  <PostEditor @post="handlePost" />
  <div>
    <h2>Respuestas</h2>
    <Posts>
      <Reply v-for="post in repliesData" :post="post" />
    </Posts>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/main'
const store = useMainStore()
const route = useRoute()

const { fetchPost, fetchReplies, createReply } = store

/* Fetch post */
const {
  data: post,
  error: postError,
  refresh: postRefresh
} = await useAsyncData('post', async () => {
  const data = await fetchPost(route.params.id)
  return data
})

const {
  data: repliesData,
  error: repliesError,
  refresh: repliesRefresh
} = await useAsyncData('replies', async () => {
  const data = await fetchReplies(route.params.id)

  return data
})

const handlePost = async () => {
  await createReply(route.params.id)
}

const date = computed(() => formatDate(post.value.created_at))
</script>

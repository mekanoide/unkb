<template>
  <User :user="post.users" /> <time :datetime="date">{{ date }}</time>
  <PostContent :content="post.content" />
  <PostEditor />
  <h2>Respuestas</h2>
  <PostList>
    <Reply v-for="post in repliesData" :post="post" />
  </PostList>
</template>

<script setup>
import { useMainStore } from '@/stores/main'
const store = useMainStore()
const route = useRoute()

const { fetchPost } = store

/* Fetch post */
const {
  data: post,
  error: postError,
  refresh: postRefresh
} = await useAsyncData('post', async () => {
  const data = await fetchPost(route.params.id)
  console.log('Datos del post', data)
  return data
})

const date = computed(() => formatDate(post.value.created_at))
</script>

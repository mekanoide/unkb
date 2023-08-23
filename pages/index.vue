<script setup>
definePageMeta({
  middleware: ['auth']
})
import { useInfiniteScroll } from '@vueuse/core'
import { useMainStore } from '@/stores/main'

const store = useMainStore()
const client = useSupabaseClient()
const user = useSupabaseUser()

const { fetchPostsFromFollowedUsers } = store

/* Fetch posts from followed users */

const {
  data: posts,
  error: postsError,
  refresh: postsRefresh
} = await useAsyncData('posts', async () => {
  const data = await fetchPostsFromFollowedUsers()
  return data
})
</script>

<template>
  <CreatePost @refresh="refreshPosts" />
  <EditPost v-if="store.postBeingEdited" @refresh="refreshPosts" />
  <Posts>
    <Post v-for="post in posts" :post="post" @deleted="refreshPosts" />
  </Posts>
  <EmptyState v-if="posts?.length === 0" message="Aún no hay nada publicado" />
</template>

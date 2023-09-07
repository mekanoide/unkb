<script setup>
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/post'

// TODO: Hacer el middleware de autenticación
definePageMeta({
  middleware: ['auth']
})

const client = useSupabaseClient()

const postStore = usePostStore()

const { postBeingEdited } = storeToRefs(postStore)
const { fetchPostsFromConnections } = postStore

/* Fetch posts from followed users */
const {
  data: posts,
  error,
  refresh
} = useAsyncData('posts', async () => await fetchPostsFromConnections(), {
  lazy: true
})

const handleRefresh = async () => refresh()
</script>

<template>
  <CreatePost @posted="handleRefresh" />
  <ul v-if="posts && posts.length > 0">
    <Post
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @deleted="handleRefresh" />
  </ul>
  <EmptyState
    v-else
    message="Aún no hay nada publicado" />
  <EditPost
    v-if="postBeingEdited"
    @edited="handleRefresh" />
</template>

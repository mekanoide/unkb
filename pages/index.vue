<script setup>
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/post'

const postStore = usePostStore()

const { postBeingEdited } = storeToRefs(postStore)
const { fetchPostsFromFollowedUsers } = postStore

/* Fetch posts from followed users */
const { data: posts, error, refresh } = useAsyncData(() => fetchPostsFromFollowedUsers())

const handleRefresh = async () => {
  await refresh()
}

/* Middleware */
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <CreatePost @posted="handleRefresh" />
  <ul v-if="posts && posts.length > 0">
    <Post v-for="post in posts" :post="post" :key="post.id" @deleted="handleRefresh" />
  </ul>
  <EmptyState v-else message="Aún no hay nada publicado" />
  <EditPost v-if="postBeingEdited" @edited="handleRefresh" />
</template>

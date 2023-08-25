<script setup>
definePageMeta({
  middleware: ['auth']
})

import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'

const store = useMainStore()

const { postBeingEdited } = storeToRefs(store)
const { fetchPostsFromFollowedUsers } = store

/* Fetch posts from followed users */
const { data: posts, error, refresh } = useAsyncData(() => fetchPostsFromFollowedUsers())

const handleRefresh = async () => {
  await refresh()
}

</script>

<template>
  <CreatePost @posted="handleRefresh" />
  <EditPost v-if="postBeingEdited" @edited="handleRefresh" />
  <Posts>
    <Post v-for="post in posts" :post="post" :key="post.id" @deleted="handleRefresh" />
  </Posts>
  <EmptyState v-if="posts?.length === 0" message="Aún no hay nada publicado" />
</template>

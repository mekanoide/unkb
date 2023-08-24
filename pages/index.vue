<script setup>
definePageMeta({
  middleware: ['auth']
})

import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'

const store = useMainStore()
const client = useSupabaseClient()
const user = useSupabaseUser()

const { posts, postBeingEdited } = storeToRefs(store)
const { fetchPostsFromFollowedUsers } = store

/* Fetch posts from followed users */
await fetchPostsFromFollowedUsers()

const refresh = async () => {
  await fetchPostsFromFollowedUsers()
}
</script>

<template>
  <CreatePost @refresh="refresh" />
  <EditPost v-if="postBeingEdited" @edited="refresh" />
  <Posts>
    <Post v-for="post in posts" :post="post" @deleted="refresh" />
  </Posts>
  <EmptyState v-if="posts.length === 0" message="Aún no hay nada publicado" />
</template>

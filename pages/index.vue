<script setup>
definePageMeta({
  middleware: ['auth']
})

import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/post'

const postStore = usePostStore()

const { postBeingEdited } = storeToRefs(postStore)

const { data: postsFromConnections, refresh } = await useFetch('/api/v1/posts/followed')
</script>

<template>
  <CreatePost @posted="refresh" />
  <ul v-if="postsFromConnections && postsFromConnections.length > 0">
    <Post
      v-for="post in postsFromConnections"
      :post="post"
      :key="post.id"
      @deleted="refresh" />
  </ul>
  <EmptyState
    v-else
    message="Aún no hay nada publicado" />
  <EditPost
    v-if="postBeingEdited"
    @edited="refresh" />
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/post'

const postStore = usePostStore()

const { postBeingEdited } = storeToRefs(postStore)

const { data: postsFromConnections } = await useFetch('/api/v1/posts/followed')

const handleRefresh = async () => refresh()
</script>

<template>
  <CreatePost @posted="handleRefresh" />
  <ul v-if="postsFromConnections && postsFromConnections.length > 0">
    <Post
      v-for="post in postsFromConnections"
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

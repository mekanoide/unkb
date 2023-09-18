<script setup>
definePageMeta({
  middleware: ['auth']
})

import { storeToRefs } from 'pinia'
import { useEditionStore } from '@/stores/edition'

const editionStore = useEditionStore()

const { edit } = storeToRefs(editionStore)

const { data: postsFromConnections, refresh } = await useFetch(
  '/api/v1/posts/followed'
)

watch(edit, (newValue) => {
  if (newValue) {
    refresh()
  }
})
</script>

<template>
  <CreatePost @posted="refresh" />
  <ul v-if="postsFromConnections && postsFromConnections.length > 0">
    <li v-for="post in postsFromConnections">
      <Post
        :post="post"
        :key="post.id"
        @deleted="refresh" />
    </li>
  </ul>
  <EmptyState
    v-else
    message="Aún no hay nada publicado" />
</template>

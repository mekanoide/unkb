<script setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/stores/posts'
const postsStore = usePostsStore()

const { checkPostsFromConnections, fetchNewPostsFromConnections, fetchMorePostsFromConnections } =
  postsStore
const { postsFromConnections, hasMorePostsFromConnections, pendingPosts } =
  storeToRefs(postsStore)

onMounted(() => {
  checkPostsFromConnections()
})
</script>

<template>
  <ul v-if="postsFromConnections && postsFromConnections.length > 0">
    <li
      v-for="post in postsFromConnections"
      :key="post.id">
      <Post
        :data="post"
        @changed="fetchNewPostsFromConnections"
        @deleted="fetchNewPostsFromConnections" />
    </li>
  </ul>
  <EmptyState
    v-else-if="!pendingPosts && postsFromConnections && postsFromConnections.length === 0"
    message="Aún no hay nada publicado" />
  <LoadingContent v-if="pendingPosts" />
  <End v-if="!hasMorePostsFromConnections" />
  <ButtonLoadMore
    v-else
    @click="fetchMorePostsFromConnections" />
</template>

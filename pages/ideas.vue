<script setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/stores/posts'
const postsStore = usePostsStore()

const { checkIdeas, fetchNewIdeas, fetchMoreIdeas } = postsStore

const { ideas, hasMoreIdeas, pendingPosts } = storeToRefs(postsStore)

const notes = ref([])
const loading = ref(true)
const offset = ref(0)

onMounted(() => {
  checkIdeas()
})
</script>

<template>
  <h1>Notas</h1>
  <section>
    <ul v-if="ideas && ideas.length > 0">
      <li
        v-for="idea in ideas"
        :key="idea.id">
        <Idea :data="idea" />
      </li>
    </ul>
    <EmptyState
      v-else-if="!pendingPosts && ideas && ideas.length === 0"
      message="No has anotado nada aún" />
    <LoadingContent v-if="pendingPosts" />
  </section>
</template>

<style scoped></style>

<template>
  <div>
    <main>
      <CreatePost @post="createPost" />
      <PostList v-if="posts.length !== 0">
        <Post v-for="post in posts" :post="post" />
      </PostList>
      <EmptyState v-else message="Aún no hay nada publicado" />
    </main>
    <Aside>
      <SearchUser />
      <Invitation />
      <Requests />
    </Aside>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

const store = useMainStore()
const client = useSupabaseClient()
const user = useSupabaseUser()

const userId = user.value.id
const refreshInterval = ref()

const { posts, follows, me, connections, requestUrl, followsIds } = storeToRefs(store)

store.fetchFollows()
store.fetchPosts()

const createPost = async (content) => {
  const { data, error } = await client.from('posts').upsert({
    author_id: userId,
    content: content,
    created_at: new Date()
  })
  if (error) {
    console.error('Error al crear el tweet:', error.message)
  } else {
    store.fetchPosts()
  }
}

onMounted(() => {
  refreshInterval.value = setInterval(store.fetchPosts, 30000)
})

onBeforeUnmount(() => {
  clearInterval(refreshInterval.value)
})
</script>

<style scoped>
div {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spaceL);
}
</style>

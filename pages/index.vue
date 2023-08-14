<template>
  <div>
    <main>
      <CreatePost @post="createPost" />
      <PostList v-if="postsData.length !== 0">
        <Post v-for="post in postsData" :post="post" />
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

const store = useMainStore()

const client = useSupabaseClient()
const user = useSupabaseUser()
const userId = user.value.id

const { data: followsData, error: followsError } = await useAsyncData('follows', async () => {
  const { data } = await client.from('follows').select().eq('user_id', userId)
  return data
})

const followedUserIds = followsData.value.map(follow => follow.follow_id)
followedUserIds.push(userId)

const {
  data: postsData,
  error: postsError,
  refresh: postsRefresh
} = await useAsyncData('posts', async () => {
  const { data } = await client
    .from('posts')
    .select('*, users(handle)')
    .in('author_id', followedUserIds)
    .order('created_at', { ascending: false })
  return data
})

const createPost = async (content) => {
  const { data, error } = await client.from('posts').upsert({
    author_id: userId,
    content: content,
    created_at: new Date()
  })
  if (error) {
    console.error('Error al crear el tweet:', error.message)
  } else {
    postsRefresh()
  }
}
/* 
store.posts.value = postsData
store.contacts.value = followsData
 */
onMounted(() => {
  setInterval(postsRefresh, 30000)
})
</script>

<style scoped>
div {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spaceL);
}
</style>

<template>
  <CreatePost @refresh="postsRefresh" />
  <EditPost v-if="store.postBeingEdited" @refresh="postsRefresh" />
  <PostList v-if="postsData">
    <Post v-for="post in postsData" :post="post" @edit="store.startPostEdition" @delete="handleDeletePost" />
  </PostList>
  <EmptyState v-else message="Aún no hay nada publicado" />
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'

const store = useMainStore()
const client = useSupabaseClient()
const user = useSupabaseUser()

const refreshInterval = ref()

const { me, editContent, editId } = storeToRefs(store)

/* Fetch posts from followed users */
const {
  data: postsData,
  error: postsError,
  refresh: postsRefresh
} = await useAsyncData('posts', async () => {
  const data = await store.fetchPostsFromFollowedUsers()
  return data
})

/* Fetch own user */
const { data: ownUserData, error: ownUserError } = await useAsyncData('ownUser', async () => {
  const { data, error } = await client.from('users').select().eq('id', user.value.id).single()

  if (error) {
    throw error
  }
  me.value = data
})

/* Delete post */

const handleDeletePost = async (id) => {
  await store.deletePost(id)
  postsRefresh()
}

onMounted(() => {
  /* Refreshes posts list every 30 seconds */
  /* refreshInterval.value = setInterval(postsRefresh, 60000) */
})

onBeforeUnmount(() => {
  /* clearInterval(refreshInterval.value) */
})
</script>

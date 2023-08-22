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

const { me } = storeToRefs(store)
const { startPostEdition } = store

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

<template>
  <CreatePost @refresh="postsRefresh" />
  <EditPost v-if="store.postBeingEdited" @refresh="postsRefresh" />
  <Posts />
</template>

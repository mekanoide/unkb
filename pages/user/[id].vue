<template>
  <main>
    <h1>@{{ userData.handle }}</h1>
    <p>{{ userData.bio }}</p>
    <PostList>
      <Post v-for="post in posts" />
    </PostList>
  </main>
</template>
<script setup>
const route = useRoute()
const client = useSupabaseClient()

import { useMainStore } from '@/stores/main'
const store = useMainStore()

const posts = ref(null)
posts.value = store.fetchPostsFromUser(route.params.id)

const { data: userData, pending: parentPending } = await useAsyncData('user', async () => {
  const { data } = await client
    .from('users')
    .select('*')
    .eq('id', route.params.id)
    .single()
  return data
})
</script>
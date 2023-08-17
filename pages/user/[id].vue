<template>
  <main>
    <header>
      <h1>@{{ userData.handle }}</h1>
      <p v-if="userData.bio" class="bio">{{ userData.bio }}</p>
    </header>
    <PostList v-if="postsData.length > 0">
      <Post v-for="post in postsData" :post="post" @edit="startPostEdition" @delete="deletePost" />
    </PostList>
    <EmptyState v-else message="No ha publicado nada aún" />
  </main>
  <Aside>
    <Search />
  </Aside>
</template>
<script setup>
const route = useRoute()
const client = useSupabaseClient()

import { useMainStore } from '@/stores/main'
const store = useMainStore()

const posts = ref(null)
posts.value = store.fetchPostsFromUser(route.params.id)

const { data: userData, pending: parentPending } = await useAsyncData('user', async () => {
  const { data } = await client.from('users').select('*').eq('id', route.params.id).single()
  return data
})

const {
  data: postsData,
  error: postsError,
  refresh: postsRefresh
} = await useAsyncData('posts', async () => {
  const { data, error } = await client
    .from('posts')
    .select('*, users(id, handle)')
    .eq('author_id', route.params.id)
    .order('created_at', { ascending: false })
  if (error) {
    throw error
  }
  if (data) {
    return data
  }
})
</script>

<style scoped>
header {
  padding: var(--spaceM);
  color: var(--colorBackground);
  background: var(--colorText);
  border-radius: var(--corner);
}
.bio {
  margin-top: var(--spaceS);
}
</style>

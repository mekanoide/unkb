<template>
  <ul v-if="postsData">
    <Post
      v-for="post in postsData"
      :post="post"
      @edit="startPostEdition"
      @delete="handleDeletePost"
    />
  </ul>
  <EmptyState v-else message="Aún no hay nada publicado" />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'

const props = defineProps({
  source: {
    type: String
  },
  id: {
    type: String
  }
})

const store = useMainStore()
const client = useSupabaseClient()
const user = useSupabaseUser()

const { me } = storeToRefs(store)
const { startPostEdition } = store

/* Fetch posts from followed users */
const {
  data: postsData,
  error: postsError,
  pending,
  refresh: postsRefresh
} = await useAsyncData('posts', async () => {
  let fetchFunction
  switch (props.source) {
    case 'user':
      console.log('Usuario!!!')
      fetchFunction = store.fetchPostsFromUser(props.id)
      break
    case 'replies':
      console.log('Respuestas!!!')
      fetchFunction = store.fetchReplies(props.id)
      break
    default:
      console.log('default!!')
      fetchFunction = store.fetchPostsFromFollowedUsers()
  }
  const data = await fetchFunction
  return data
})

/* Delete post */

const handleDeletePost = async (id) => {
  postsRefresh()
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>

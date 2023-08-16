<template>
  <div>
    <main>
      <CreatePost
        :edit="editContent"
        @post="createPost"
        @edit="finishPostEdition"
        @cancel="cancelPostEdition"
      />
      <PostList v-if="postsData">
        <Post
          v-for="post in postsData"
          :post="post"
          @edit="startPostEdition"
          @delete="deletePost"
        />
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

const refreshInterval = ref()
const editId = ref(null)
const editContent = ref(null)

/* Fetch posts from followed users */
const {
  data: postsData,
  error: postsError,
  refresh: postsRefresh
} = await useAsyncData(
  'posts',
  async () => {
    const { data: followsData, error: followsError } = await client
      .from('follows')
      .select()
      .eq('user_id', user.value.id)

    if (followsError) {
      throw followsError
    }

    const followedUserIds = followsData.map((item) => item.follow_id)
    followedUserIds.push(user.value.id)
    console.log('fetcheando!!!')
    const { data: postsData, error: postsError } = await client
      .from('posts')
      .select('*, users(id, handle)')
      .in('author_id', followedUserIds)
      .order('created_at', { ascending: false })
    if (postsError) {
      throw postsError
    }
    if (postsData) {
      console.log('hey', postsData)
      return postsData
    }
  },
  { lazy: true }
)

/* Create new post */
const createPost = async (content) => {
  const { data, error } = await client.from('posts').upsert({
    author_id: user.value.id,
    content: content,
    created_at: new Date()
  })
  if (error) {
    throw error
  }
  postsRefresh()
}

/* Start post edition */
const startPostEdition = async (id, content) => {
  editId.value = id
  editContent.value = content
}

/* Cancel post edition */
const cancelPostEdition = () => {
  editId.value = null
  editContent.value = null
}

/* Finish post edition and update post */
const finishPostEdition = async (content) => {
  const { data, error } = await client
    .from('posts')
    .update({
      content: content,
      edited: true
    })
    .eq('id', editId.value)
  if (error) {
    throw error
  }
  editId.value = null
  editContent.value = null
  postsRefresh()
}

/* Delete post */

const deletePost = async (id) => {
  const shouldDelete = confirm('De verdad quieres eliminar esta publicación?')
  if (!shouldDelete) {
    return
  }
  const { error } = await client.from('posts').delete().eq('id', id)
  if (error) {
    throw error
  }
  postsRefresh()
}

onMounted(() => {
  /* Refreshes posts list every 30 seconds */
  refreshInterval.value = setInterval(postsRefresh, 30000)
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

<script setup>
definePageMeta({
  middleware: ['auth']
})
import { storeToRefs } from 'pinia'
import { useEditionStore } from '@/stores/edition'

const editionStore = useEditionStore()

const { editionOK } = storeToRefs(editionStore)
const tab = ref('all')
const postsContainer = ref(null)
const posts = ref([])
const loading = ref(false)
const offset = ref(0)

const fetchPosts = async (offset) => {
  loading.value = true
  const { data } = await useFetch(
    `/api/v1/posts/from/followed?offset=${offset}`
  )
  posts.value = [...posts.value, ...data.value]
  loading.value = false
}

const { data: favs, refresh: refreshFavs } = await useFetch(
  '/api/v1/posts/favs'
)

const handleScroll = async () => {
  if (
    !loading.value && window.innerHeight + window.scrollY >= document.body.offsetHeight
  ) {
    console.log('Bottom of the page')
    offset.value++
    await fetchPosts(offset.value)
  }
}

watch(editionOK, async (newValue) => {
  if (newValue) {
    fetchPosts(offset.value)
    editionOK.value = false
  }
})

onMounted(() => {
  fetchPosts(offset.value)
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <CreatePost @posted="refresh" />
  <TabMenu>
    <Tab
      value="all"
      :selected="tab === 'all'"
      @click="tab = 'all'">
      Todos
    </Tab>
    <Tab
      value="favs"
      :selected="tab === 'favs'"
      @click="tab = 'favs'">
      Favoritos
    </Tab>
  </TabMenu>
  <section v-if="tab === 'all'">
    <ul
      v-if="posts && posts.length > 0"
      ref="postsContainer">
      <li
        v-for="post in posts"
        :key="post.id">
        <Post
          :data="post"
          @changed="refresh"
          @deleted="refresh" />
      </li>
    </ul>
    <div v-else-if="loading">Cargando!!!</div>
    <EmptyState
      v-else
      message="Aún no hay nada publicado" />
  </section>
  <section v-else-if="tab === 'favs'">
    <ul v-if="favs && favs.length > 0">
      <li
        v-for="fav in favs"
        :key="fav.posts.id">
        <Post
          :data="fav.posts"
          @changed="refreshFavs"
          @deleted="refreshFavs" />
      </li>
    </ul>
    <EmptyState
      v-else
      message="No tienes favoritos" />
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

import { useEditionStore } from '@/stores/edition'

const editionStore = useEditionStore()

const { editionOK } = storeToRefs(editionStore)
const tab = ref('all')

const { data: postsFromConnections, refresh } = await useFetch(
  '/api/v1/posts/from/followed'
)

const { data: favs, refresh: refreshFavs } = await useFetch(
  '/api/v1/posts/favs'
)

watch(editionOK, async (newValue) => {
  if (newValue) {
    refresh()
    editionOK.value = false
  }
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
    <ul v-if="postsFromConnections && postsFromConnections.length > 0">
      <li
        v-for="post in postsFromConnections"
        :key="post.id">
        <Post
          :data="post"
          @changed="refresh"
          @deleted="refresh" />
      </li>
    </ul>
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

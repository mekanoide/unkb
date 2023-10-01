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

const { data: bookmarks, refresh: refreshBookmarks } = await useFetch(
  '/api/v1/bookmarks'
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
          @deleted="refresh" />
      </li>
    </ul>
    <EmptyState
      v-else
      message="Aún no hay nada publicado" />
  </section>
  <section v-else-if="tab === 'favs'">
    <ul v-if="bookmarks && bookmarks.length > 0">
      <li
        v-for="post in bookmarks"
        :key="post.posts.id">
        <Post
          :data="post.posts"
          @deleted="refresh" />
      </li>
    </ul>
    <EmptyState
      v-else
      message="No tienes favoritos" />
  </section>
</template>

<script setup>
const config = useRuntimeConfig()
const tab = ref('saved')

const { data: bookmarks, refresh: refreshBookmarks } = await useFetch(
  '/api/v1/bookmarks/'
)
</script>

<template>
  <TabMenu>
    <Tab :selected="tab === 'saved'" @click="tab = 'saved'">Guardados</Tab>
    <Tab :selected="tab=== 'mine'" @click="tab = 'mine'">Mis cosas</Tab>
  </TabMenu>

  <div v-if="tab === 'saved'">
    <ul
      class="Bookmarks"
      v-if="bookmarks">
      <Bookmark
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
        :data="bookmark" />
    </ul>
  </div>
  <div v-else-if="tab === 'mine'">
    <CreatePost placeholder="Escribe solo para ti..." />
  </div>
</template>

<style scoped>
.Bookmarks {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: var(--spaceM);
}
</style>

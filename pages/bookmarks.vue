<script setup>
const config = useRuntimeConfig()

const { data: bookmarkList, refresh: refreshBookmarks } = await useFetch(
  '/api/v1/bookmarks/'
)
</script>

<template>
  <div>
    <ul v-if="bookmarkList && bookmarkList.length > 0">
      <li
        v-for="post in bookmarkList"
        :key="post.id">
        <Post
          :data="post"
          @deleted="refreshBookmarks" />
      </li>
    </ul>
    <EmptyState
      v-else
      message="Aún no hay nada publicado" />
  </div>
</template>

<style scoped></style>

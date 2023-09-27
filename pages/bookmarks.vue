<script setup>
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
        <Bookmark
          :data="post"
          @removed="refreshBookmarks" />
      </li>
    </ul>
    <EmptyState
      v-else
      message="Aún no hay nada publicado" />
  </div>
</template>

<style scoped></style>

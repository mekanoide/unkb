<script setup>
const config = useRuntimeConfig()

const { data: bookmarks, refresh: refreshBookmarks } = await useFetch(
  '/api/v1/bookmarks/'
)
</script>

<template>
  <div>
    <ul
      class="Bookmarks"
      v-if="bookmarks">
      <li
        v-for="bookmark in bookmarks"
        :key="bookmark.id">
        <Bookmark :data="bookmark" />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>

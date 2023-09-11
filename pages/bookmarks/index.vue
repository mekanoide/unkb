<script setup>
const config = useRuntimeConfig()

const { data: bookmarks, refresh: refreshBookmarks } = await useFetch(
  '/api/v1/bookmarks/'
)
</script>

<template>
  <h1>Guardados!!!</h1>
  <div><Button @click="handleCreateBookmark">Crear registro</Button></div>
  <ul v-if="bookmarks">
    <Bookmark
      v-for="bookmark in bookmarks"
      :key="bookmark.id"
      :data="bookmark" />
  </ul>
  <p>
    El guardado y categorización de contenido guardado va a ser una parte clave
    de
    {{ config.public.appName }}.
  </p>
  <p>Habrá colecciones, etiquetas y toda la vaina.</p>
</template>

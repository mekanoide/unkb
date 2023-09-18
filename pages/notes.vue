<script setup>
const config = useRuntimeConfig()
const tab = ref('saved')

const { data: notes, refresh: refreshNotes } = await useFetch('/api/v1/notes')

const postNote = async (content) => {
  const { data } = await useFetch('/api/v1/notes/create', {
    method: 'post',
    body: {
      content: content
    }
  })
  refreshNotes()
}
</script>

<template>
  <h1>Notas</h1>
  <PostEditor
    placeholder="Escribe solo para ti..."
    @submit="postNote" />
  <ul v-if="notes">
    <li
      v-for="note in notes"
      :key="note.id">
      <Note :data="note" />
    </li>
  </ul>
  <EmptyState v-else message="No has anotado nada aún" />
</template>

<style scoped></style>

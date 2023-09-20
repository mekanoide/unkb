<script setup>
import { storeToRefs } from 'pinia'
import { useEditionStore } from '@/stores/edition'
const editionStore = useEditionStore()

const config = useRuntimeConfig()
const tab = ref('saved')

const { editionOK } = storeToRefs(editionStore)
const { data: notes, refresh: refreshNotes } = await useFetch('/api/v1/notes')

const postNote = async (content) => {
  const { data } = await useFetch('/api/v1/posts/create', {
    method: 'post',
    body: {
      content: content,
      scope: 'private'
    }
  })
  refreshNotes()
}

watch(editionOK, async (newValue) => {
  if (newValue) {
    refreshNotes()
    editionOK.value = false
  }
})
</script>

<template>
  <h1>Notas</h1>
  <PostEditor
    placeholder="Escribe solo para ti..."
    @submit="postNote" />
  <ul v-if="notes && notes.length > 0">
    <li
      v-for="note in notes"
      :key="note.id">
      <Note
        :data="note"
        @deleted="refreshNotes" />
    </li>
  </ul>
  <EmptyState
    v-else
    message="No has anotado nada aún" />
</template>

<style scoped>
</style>
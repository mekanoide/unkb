<script setup>
import { useEditionStore } from '@/stores/edition'
import { usePostStore } from '@/stores/post'
const editionStore = useEditionStore()
const postStore = usePostStore()

const config = useRuntimeConfig()
const tab = ref('saved')

const { createPost } = postStore
const { editionOK } = storeToRefs(editionStore)
const { data: notes, refresh: refreshNotes } = await useFetch('/api/v1/notes')

const handlePost = async (content, scope) => {
  await createPost(content, scope)
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
    postType="note"
    @post="handlePost"
    @posted="refreshNotes" />
  <ul v-if="notes && notes.length > 0">
    <li
      v-for="note in notes"
      :key="note.id">
      <Note
        :data="note"
        @deleted="refreshNotes"
        @published="refreshNotes" />
    </li>
  </ul>
  <EmptyState
    v-else
    message="No has anotado nada aún" />
</template>

<style scoped></style>

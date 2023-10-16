<script setup>
import { storeToRefs } from 'pinia'
import { useEditionStore } from '@/stores/edition'
import { useNoteStore } from '@/stores/note'
const editionStore = useEditionStore()
const noteStore = useNoteStore()

const config = useRuntimeConfig()
const tab = ref('all')

const { createNote } = noteStore
const { editionOK } = storeToRefs(editionStore)
const { data: notes, refresh: refreshNotes } = await useFetch('/api/v1/notes')
const { data: pinned, refresh: refreshPinned } = await useFetch('/api/v1/notes/pinned')

const handlePost = async (content, scope) => {
  await createNote(content)
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
  <TabMenu>
    <Tab
      value="all"
      :selected="tab === 'all'"
      @click="tab = 'all'">
      Todos
    </Tab>
    <Tab
      value="favs"
      :selected="tab === 'pinned'"
      @click="tab = 'pinned'">
      Fijados
    </Tab>
  </TabMenu>
  <section v-if="tab === 'all'">
    <ul v-if="notes && notes.length > 0">
      <li
        v-for="note in notes"
        :key="note.id">
        <Note
          :data="note"
          @changed="refreshNotes" />
      </li>
    </ul>
    <EmptyState
      v-else
      message="No has anotado nada aún" />
  </section>
  <section v-else-if="tab === 'pinned'">
    <ul v-if="pinned && pinned.length > 0">
      <li
        v-for="note in pinned"
        :key="note.id">
        <Note
          :data="note"
          @changed="refreshPinned" />
      </li>
    </ul>
    <EmptyState
      v-else
      message="No hay nada" />
  </section>
</template>

<style scoped></style>

<script setup>
import { storeToRefs } from 'pinia'
import { useEditionStore } from '@/stores/edition'
import { useNoteStore } from '@/stores/note'
const editionStore = useEditionStore()
const noteStore = useNoteStore()

const config = useRuntimeConfig()
const tab = ref('all')
const notes = ref([])
const loading = ref(true)
const offset = ref(0)

const { createNote } = noteStore
const { editionOK } = storeToRefs(editionStore)

const fetchNotes = async (offset) => {
  loading.value = true
  const { data } = await useFetch(
    `/api/v1/notes?offset=${offset}`
  )
  console.log('Notas', data)
  notes.value = [...notes.value, ...data.value]
  loading.value = false
}

const { data: pinned, refresh: refreshPinned } = await useFetch(
  '/api/v1/notes/pinned'
)

const handlePost = async (content, scope) => {
  await createNote(content)
  fetchNotes()
}

const handleScroll = async () => {
  if (
    !loading.value &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight
  ) {
    console.log('Bottom of the page')
    offset.value++
    await fetchNotes(offset.value)
  }
}

watch(editionOK, async (newValue) => {
  if (newValue) {
    fetchNotes()
    editionOK.value = false
  }
})

onMounted(() => {
  fetchNotes(offset.value)
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <h1>Notas</h1>
  <PostEditor
    placeholder="Escribe solo para ti..."
    postType="note"
    @post="handlePost"
    @posted="fetchNotes(offset)" />
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
          @changed="fetchNotes(offset)" />
      </li>
    </ul>
    <EmptyState
      v-else-if="!loading && notes && notes.length === 0"
      message="No has anotado nada aún" />
    <LoadingContent v-if="loading" />
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
      v-else-if="!loading && pinned && pinned.length === 0"
      message="No hay nada" />
  </section>
</template>

<style scoped></style>

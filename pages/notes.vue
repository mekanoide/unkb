<script setup>
import { useEditionStore } from '@/stores/edition'
import { usePostStore } from '@/stores/post'
const editionStore = useEditionStore()
const postStore = usePostStore()

const config = useRuntimeConfig()
const tab = ref('all')

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
  <TabMenu>
    <Tab
      value="all"
      :selected="tab === 'all'"
      @click="tab = 'all'">
      Todos
    </Tab>
    <Tab
      value="favs"
      :selected="tab === 'favs'"
      @click="tab = 'favs'">
      Favoritos
    </Tab>
  </TabMenu>
  <section v-if="tab === 'all'">
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
  </section>
  <section v-else-if="tab === 'favs'">
    <h1>No hay nada</h1>
  </section>
</template>

<style scoped></style>

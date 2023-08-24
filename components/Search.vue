<script setup>
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

const client = useSupabaseClient()
const user = useSupabaseUser()
const store = useMainStore()

const { sendConnectionRequest } = store

const userId = user.value.id
const searchResults = ref([])
const { showPopover } = storeToRefs(store)

const searchUsers = async (query) => {
  const { data, error } = await client
    .from('users')
    .select()
    .textSearch('handle', query)

  if (error) {
    throw error
  }
  searchResults.value = data
  showPopover.value = 'search-results'
}

const handleSendConnectionRequest = async (id) => {
  await sendConnectionRequest(id)
  console.log('Solicitud enviada!!!')
}
</script>

<template>
  <section>
    <SearchField @submit="searchUsers" />
    <div class="results-wrapper">
      <Dropdown class="results" v-if="showPopover === 'search-results'" closeable>
        <ul v-if="searchResults.length > 0">
          <li v-for="result in searchResults" :key="result.id">
            <User :data="result" />
            <Button size="small" @click="handleSendConnectionRequest(result.id)">Conectar</Button>
          </li>
        </ul>
        <div v-else>No se ha encontrado nada con ese nombre</div>
      </Dropdown>
    </div>
  </section>
</template>

<style scoped>
.results-wrapper {
  position: relative;
}

.results {
  width: 100%;
  top: var(--spaceS);
  display: grid;
  gap: var(--spaceM);
}

ul {
  display: grid;
  gap: var(--spaceS);
}

li {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}
</style>

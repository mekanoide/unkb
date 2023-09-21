<script setup>
import { useMainStore } from '@/stores/main'
import { useConnectionsStore } from '@/stores/connections'


const client = useSupabaseClient()
const store = useMainStore()
const connectionsStore = useConnectionsStore()

const searchResults = ref([])
const { showPopover } = storeToRefs(store)

const searchUsers = async (query) => {
  const { data, error } = await useFetch(`/api/v1/search/${query}`)
  searchResults.value = data.value
  showPopover.value = 'search-results'
}

const handleCreateConnectionRequest = async (id) => {
  await useFetch('/api/v1/connections/requests/create', {
    method: 'post',
    body: {
      id: id
    }
  })
}

const handleCancelConnectionRequest = async (id) => {
  await useFetch('/api/v1/connections/requests/cancel', {
    method: 'post',
    body: {
      id: id
    }
  })
}
</script>

<template>
  <section>
    <SearchField @submit="searchUsers" />
    <div class="results-wrapper">
      <Dropdown
        class="results"
        v-if="showPopover === 'search-results'"
        @close="showPopover = null">
        <ul v-if="searchResults.length > 0">
          <li
            v-for="result in searchResults"
            :key="result.id">
            <User :data="result" @click="showPopover = null" />
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
}

ul {
  display: grid;
}

li {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}
</style>

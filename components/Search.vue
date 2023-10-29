<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { useConnectionsStore } from '@/stores/connections'

const client = useSupabaseClient()
const store = useMainStore()
const connectionsStore = useConnectionsStore()

const searchResults = ref([])
const { showPopover } = storeToRefs(store)

const props = defineProps({
  type: {
    type: String
  }
})

const search = async (query) => {
  if (props.type === 'groups') {
    const { data, error } = await useFetch(`/api/v1/groups/search/${query}`)
  } else {
    const { data, error } = await useFetch(`/api/v1/users/search/${query}`)
  }
  searchResults.value = data.value
  showPopover.value = 'search-results'
}

const placeholder = computed(() => {
  if (props.type === 'groups') {
    return 'Busca un corrillo'
  }
  return 'Busca un usuario'
})
</script>

<template>
  <section>
    <SearchField
      :placeholder="placeholder"
      @submit="search" />
    <div class="results-wrapper">
      <Dropdown
        class="results"
        v-if="showPopover === 'search-results'"
        @close="showPopover = null">
        <ul v-if="searchResults.length > 0">
          <li
            v-for="result in searchResults"
            :key="result.id">
            <div
              v-if="type === 'groups'"
              :data="result">
              {{ result.name }}
            </div>
            <User
              v-else
              :data="result"
              @click="showPopover = null" />
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

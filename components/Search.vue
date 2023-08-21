<template>
  <section>
    <div class="searchfield">
      <form action="search" @submit.prevent="searchUsers">
        <input
          type="search"
          v-model="searchQuery"
          placeholder="Buscar usuarios"
        />
        <Button type="submit" class="search-button" variant="square"><Icon name="carbon:search" size="1.5rem" /></Button>
      </form>
    </div>
    <div class="results-wrapper">
      <Dropdown class="results" v-if="showPopover === 'search-results'" closeable>
        <ul v-if="searchResults.length > 0">
          <li v-for="result in searchResults" :key="result.id">
            <NuxtLink :to="`/${result.handle}`">@{{ result.handle }}</NuxtLink>
            <Button variant="primary" size="small" @click="sendFriendRequest(result.id)">Conectar</Button>
          </li>
        </ul>
        <div v-else>No se ha encontrado nada con ese nombre</div>
      </Dropdown>
    </div>
  </section>
</template>

<script setup>
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

const client = useSupabaseClient()
const user = useSupabaseUser()
const store = useMainStore()

const userId = user.value.id
const searchQuery = ref('')
const searchResults = ref([])
const { showPopover } = storeToRefs(store)

const searchUsers = async () => {
  const { data, error } = await client
    .from('users')
    .select()
    .textSearch('handle', `${searchQuery.value}`)

  if (error) {
    throw error
  }
  searchResults.value = data
  showPopover.value = 'search-results'
}

const sendFriendRequest = async (friendId) => {}
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: var(--spaceXS);
  position: relative;
}

.search-button {
  position: absolute;
  right: var(--spaceS);
}

input {
  padding-right: var(--spaceL);
}

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
  grid-auto-flow: column;
  align-items: center;
}
</style>

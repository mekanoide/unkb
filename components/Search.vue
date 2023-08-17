<template>
  <section>
    <div class="searchfield">
      <input
        type="search"
        v-model="searchQuery"
        placeholder="Buscar usuarios por nombre o correo electrónico"
      />
      <Button @click="searchUsers">Buscar</Button>
    </div>
    <Dropdown v-if="showPopover === 'search-results'">
      <ul>
        <li v-for="result in searchResults" :key="result.id">
          <NuxtLink :to="`/user/${result.id}`">@{{ result.handle }}</NuxtLink>
          <Button @click="sendFriendRequest(result.id)">Enviar solicitud de amistad</Button>
        </li>
      </ul>
    </Dropdown>
  </section>
</template>

<script setup>
import { useMainStore } from '@/stores/main';
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
.searchfield {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--spaceXS);
}
</style>

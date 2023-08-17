<template>
  <section>
    <div class="searchfield">
      <input type="search" v-model="searchQuery" placeholder="Buscar usuarios por nombre o correo electrónico" />
      <Button @click="searchUsers">Buscar</Button>
    </div>
    <ul v-if="searchResults.length > 0">
      <li  v-for="result in searchResults" :key="result.id">
        <NuxtLink :to="`/user/${result.id}`">@{{ result.handle }}</NuxtLink>
        <Button @click="sendFriendRequest(result.id)">Enviar solicitud de amistad</Button>
      </li>
    </ul>
  </section>
</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()
const userId = user.value.id

const searchQuery = ref('')
const searchResults = ref([])

const searchUsers = async () => {
  const { data, error } = await client
    .from('users')
    .select()
    .textSearch('handle', `${searchQuery.value}`)

  if (error) {
    throw error
  }
  searchResults.value = data
}

const sendFriendRequest = async (friendId) => {

}
</script>

<style scoped>
.searchfield {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--spaceXS);
}
</style>
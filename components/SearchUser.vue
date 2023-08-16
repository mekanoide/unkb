<template>
  <section>
    <div class="searchfield">
      <input type="search" v-model="searchQuery" placeholder="Buscar usuarios por nombre o correo electrónico" />
      <Button @click="searchUsers">Buscar</Button>
    </div>

    <div v-for="user in searchResults" :key="user.id">
      <NuxtLink :to="`/user/${user.id}`">@{{ user.handle }}</NuxtLink>
      <Button @click="sendFriendRequest(user.id)">Enviar solicitud de amistad</Button>
    </div>
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
    console.error('Error al buscar usuarios:', error.message)
  } else {
    searchResults.value = data
  }
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
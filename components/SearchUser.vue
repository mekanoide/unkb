<template>
  <div>
    <input v-model="searchQuery" placeholder="Buscar usuarios por nombre o correo electrónico" />
    <Button @click="searchUsers">Buscar</Button>

    <div v-for="user in searchResults" :key="user.id">
      <p>{{ user.handle }}</p>
      <button @click="sendFriendRequest(user.id)">Enviar solicitud de amistad</button>
    </div>
  </div>
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

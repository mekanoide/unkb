<script setup>
definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const user = useSupabaseUser()

/* Fetch users status */
const { data: connectionStatus, refresh: connectionStatusRefresh } =
  await useFetch(`/api/v1/connections/status/${selectedUser.value.id}`)

const handleDeleteConnection = async (id) => {
  await deleteConnection(selectedUser.id)
  refreshConnections()
}
</script>

<template>
  <header>
    <h1>{{ route.params.name }}</h1>
  </header>
</template>

<style scoped>
header {
  padding: var(--spaceM);
  color: var(--colorBackground);
  background: var(--colorText);
  border-radius: var(--corner);
}
.bio {
  margin-top: var(--spaceM);
}

h1 {
  text-transform: none;
}
</style>

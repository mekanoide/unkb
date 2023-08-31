<script setup>
import { useConnectionsStore } from '@/stores/connections'
const store = useConnectionsStore()
const { fetchConnectionRequests, acceptConnection } = store

const handleAcceptConnection = async (id) => {
  console.log('handle!', id)
  await acceptConnection(id)
  refresh()
}

const {
  data: requests,
  error,
  refresh
} = useAsyncData(() => fetchConnectionRequests())
</script>

<template>
  <section v-if="requests && requests.length > 0">
    <h2>Peticiones de conexión</h2>
    <ul>
      <li v-for="request in requests">
        <User :data="request.requester" />
        <Button @click="handleAcceptConnection(request.user_id)">Aceptar</Button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  padding: var(--spaceS) var(--spaceM);
  border: 1px dashed var(--colorText);
  border-radius: var(--corner);
}

li {
  padding: var(--spaceS) 0;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
}

li + li {
  border-top: 1px dashed var(--colorText);
}
</style>

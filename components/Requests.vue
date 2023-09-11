<script setup>
import { useConnectionsStore } from '@/stores/connections'
const store = useConnectionsStore()

const handleAcceptConnection = async (id) => {
  await useFetch('/api/v1/connections/requests/accept', {
    method: 'post',
    body: {
      id: id
    }
  })
  refresh()
}

const { data: requests, refresh } = await useFetch('/api/v1/connections/requests')
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
  border: 2px dashed var(--colorText);
  border-radius: var(--corner);
}

li {
  padding: var(--spaceS) 0;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
}

li + li {
  border-top: 2px dashed var(--colorText);
}
</style>

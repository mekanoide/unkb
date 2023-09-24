<script setup>
definePageMeta({
  middleware: ['auth']
})

import { usePostStore } from '@/stores/post'
import { useConnectionsStore } from '@/stores/connections'

/* composables */

const postStore = usePostStore()
const connectionsStore = useConnectionsStore()
const route = useRoute()
const user = useSupabaseUser()

/* properties and function */

const tab = ref('content')

const { postBeingEditedId } = postStore
const { deleteConnection } = connectionsStore

const editProfile = () => {
  console.log('Edit profile')
}

/* Fetch data */
const { data: selectedUser, pending: selectedUserPending } = await useFetch(
  `/api/v1/users/${route.params.handle}`
)

const { data: userPosts, refresh: refreshPosts } = await useFetch(
  `/api/v1/posts/from/${selectedUser.value.id}`
)

/* Fetch user connections */
const { data: connections, refresh: refreshConnections } = await useFetch(
  `/api/v1/connections/${selectedUser.value.id}`
)

/* Fetch users status */
const { data: connectionStatus, refresh: connectionStatusRefresh } =
  await useFetch(`/api/v1/connections/status/${selectedUser.value.id}`)

const handleDeleteConnection = async (id) => {
  await deleteConnection(selectedUser.id)
  refreshConnections()
}

const handleSendConnectionRequest = async (id) => {
  await useFetch('/api/v1/connections/requests/create', {
    method: 'post',
    body: {
      id: id
    }
  })
  connectionStatusRefresh()
}

const handleCancelConnectionRequest = async (id) => {
  await useFetch('/api/v1/connections/requests/cancel', {
    method: 'post',
    body: {
      id: id
    }
  })
  connectionStatusRefresh()
}

const handleAcceptRequest = async (id) => {
  await useFetch('/api/v1/connections/requests/accept', {
    method: 'post',
    body: {
      id: id
    }
  })
  connectionStatusRefresh()
}

const handleRejectRequest = async (id) => {
  await useFetch('/api/v1/connections/requests/reject', {
    method: 'post',
    body: {
      id: id
    }
  })
  connectionStatusRefresh()
}

const statusDescription = computed(() => {
  switch (connectionStatus.value) {
    case 'not_connected':
      return 'No es un contacto'
    case 'connected':
      return 'Es un contacto'
    case 'requested':
      return 'Has solicitado conectar'
    case 'received':
      return 'Quiere conectar contigo'
  }
})
</script>

<template>
  <header>
    <h1 v-if="selectedUser">{{ selectedUser.handle }}</h1>
    <p
      v-if="selectedUser && selectedUser.bio"
      class="bio">
      {{ selectedUser.bio }}
    </p>
  </header>
  <p
    class="status"
    v-if="connectionStatus !== 'myself'">
    {{ statusDescription }}
  </p>
  <div class="actions">
    <Button
      v-if="connectionStatus === 'connected'"
      @click="handleDeleteConnection(selectedUser.id)">
      Cortar conexión
    </Button>
    <Button
      v-if="connectionStatus === 'requested'"
      @click="handleCancelConnectionRequest(selectedUser.id)">
      Cancelar solicitud
    </Button>
    <div v-if="connectionStatus === 'received'">
      <Button
        @click="handleAcceptRequest(selectedUser.id)">
        Aceptar conexión
      </Button>
      <Button
        variant="secondary"
        @click="handleRejectRequest(selectedUser.id)">
        Rechazar
      </Button>
    </div>
    <Button
      v-if="connectionStatus === 'not_connected'"
      @click="handleSendConnectionRequest(selectedUser.id)"
      >Pedir conexión</Button
    >
    <Button
      v-if="connectionStatus === 'myself'"
      @click="editProfile"
      >Editar perfil</Button
    >
  </div>
  <TabMenu>
    <Tab
      value="content"
      :selected="tab === 'content'"
      @click="tab = 'content'">
      Publicaciones
    </Tab>
    <Tab
      value="connections"
      :selected="tab === 'connections'"
      @click="tab = 'connections'">
      Conexiones
    </Tab>
    <Tab
      v-if="selectedUser && user.id === selectedUser.id"
      value="invitations"
      :selected="tab === 'invitations'"
      @click="tab = 'invitations'">
      Invitaciones
    </Tab>
  </TabMenu>
  <div
    v-if="tab === 'content'"
    class="posts">
    <ul v-if="userPosts && userPosts.length > 0">
      <li v-for="post in userPosts">
        <Post
          :data="post"
          @deleted="refreshPosts" />
      </li>
    </ul>
    <EmptyState
      v-else
      message="Aún no hay nada publicado" />
  </div>
  <Connections
    :id="selectedUser.id"
    :data="connections"
    v-else-if="tab === 'connections'"
    @changed="connectionsRefresh" />
  <Invitations
    v-else-if="tab === 'invitations'"
    :data="invitations" />
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

.status {
}

h1 {
  text-transform: none;
}
</style>

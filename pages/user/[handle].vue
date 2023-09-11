<script setup>
definePageMeta({
  middleware: ['auth']
})

import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'
import { useConnectionsStore } from '@/stores/connections'
import { storeToRefs } from 'pinia'

/* composables */

const mainStore = useMainStore()
const postStore = usePostStore()
const connectionsStore = useConnectionsStore()
const route = useRoute()
const user = useSupabaseUser()

/* properties and function */

const tab = ref('content')

const { fetchUserByHandle } = mainStore
const { postBeingEdited, fetchPostsFromUser } = postStore
const {
  fetchConnections,
  areWeConnected,
  deleteConnection,
  sendConnectionRequest
} = connectionsStore

const editProfile = () => {
  console.log('Edit profile')
}

/* fetch data */

const { data: selectedUser, pending: selectedUserPending } = await useFetch(
  `/api/v1/users/${route.params.handle}`
)

console.log('selected user ', selectedUser.value)

const { data: userPosts, refresh: refreshPosts } = await useFetch(
  `/api/v1/posts/${selectedUser.value.id}`
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
  <p class="status" v-if="connectionStatus !== 'myself'">{{ statusDescription }}</p>
  <div class="actions">
    <Button
      v-if="connectionStatus === 'connected'"
      size="small"
      @click="handleDeleteConnection(selectedUser.id)">
      Cortar conexión
    </Button>
    <Button
      v-if="connectionStatus === 'requested'"
      size="small"
      @click="handleCancelConnectionRequest(selectedUser.id)">
      Cancelar solicitud
    </Button>
    <div v-if="connectionStatus === 'received'">
      <Button
        size="small"
        @click="handleAcceptRequest(selectedUser.id)">
        Aceptar conexión
      </Button>
      <Button
        size="small"
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
      Contenido
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
  <!-- TODO: for the moment it's just for me to invite people -->
  <div
    v-if="tab === 'content'"
    class="posts">
    <ul v-if="userPosts && userPosts.length > 0">
      <Post
        v-for="post in userPosts"
        :post="post"
        @deleted="postsRefresh" />
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
  <Invitations v-else-if="tab === 'invitations'" />
  <EditPost
    v-if="postBeingEdited"
    @edited="postsRefresh" />
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

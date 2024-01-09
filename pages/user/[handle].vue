<script setup>
definePageMeta({
  middleware: ['auth']
})

import { useConnectionsStore } from '@/stores/connections'

/* composables */

const connectionsStore = useConnectionsStore()
const route = useRoute()
const user = useSupabaseUser()
const showEditProfile = ref(false)

/* properties and function */

const tab = ref('content')

const { deleteConnection } = connectionsStore

const editProfile = () => {
  showEditProfile.value = true
}

/* Fetch selected user data */
const {
  data: selectedUser,
  pending: selectedUserPending,
  refresh: refreshSelectedUser
} = await useFetch(`/api/users/${route.params.handle}`)

const { data: userPosts, refresh: refreshPosts } = await useFetch(
  `/api/posts/from/${selectedUser.value.id}`
)

/* Fetch users status */
const { data: connectionStatus, refresh: connectionStatusRefresh } =
  await useFetch(`/api/connections/status/${selectedUser.value.id}`)

const handleDeleteConnection = async (id) => {
  await deleteConnection(selectedUser.id)
  refreshConnections()
}

const handleSendConnectionRequest = async (id) => {
  await useFetch('/api/connections/requests/create', {
    method: 'post',
    body: {
      id: id
    }
  })
  connectionStatusRefresh()
}

const handleCancelConnectionRequest = async (id) => {
  await useFetch('/api/connections/requests/cancel', {
    method: 'post',
    body: {
      id: id
    }
  })
  connectionStatusRefresh()
}

const handleAcceptRequest = async (id) => {
  await useFetch('/api/connections/requests/accept', {
    method: 'post',
    body: {
      id: id
    }
  })
  connectionStatusRefresh()
}

const handleRejectRequest = async (id) => {
  await useFetch('/api/connections/requests/reject', {
    method: 'post',
    body: {
      id: id
    }
  })
  connectionStatusRefresh()
}

const handleUpdateProfile = async () => {
  await refreshSelectedUser()
  showEditProfile.value = false
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
      <Button @click="handleAcceptRequest(selectedUser.id)">
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
    v-else-if="tab === 'connections'" />
  <EditProfile
    v-if="showEditProfile"
    @update="handleUpdateProfile"
    @close="showEditProfile = false" />
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

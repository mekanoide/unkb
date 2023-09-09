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

const { data: connected, error: connectedError } = useAsyncData(
  'connected',
  () => areWeConnected(selectedUser.value.id),
  {
    lazy: true
  }
)

const handleDeleteConnection = async (id) => {
  await deleteConnection(selectedUser.id)
  refreshConnections()
}
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
  <div
    class="status"
    v-if="selectedUser && user.id !== selectedUser.id">
    <Button
      v-if="connected"
      @click="handleDeleteConnection(selectedUser.id)"
      >Cortar</Button
    >
    <Button
      variant="primary"
      v-else
      @click="sendConnectionRequest(selectedUser.id)"
      >Pedir conexión</Button
    >
  </div>
  <div v-else>
    <!-- TODO: Finish edit profile modal  -->
    <Button @click="editProfile">Editar perfil</Button>
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
      Lazos
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
  margin-top: var(--spaceS);
}

.status {
  padding-top: var(--spaceM);
}

h1 {
  text-transform: none;
}
</style>

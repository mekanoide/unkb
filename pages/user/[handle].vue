<script setup>
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
const { areWeConnected, deleteConnection, sendConnectionRequest } =
  connectionsStore

const editProfile = () => {
  console.log('Edit profile')
}

/* fetch data */

const {
  data: activeUser,
  pending: activeUserPending
} = useAsyncData('user', async () => await fetchUserByHandle(route.params.handle), {
  lazy: true
})

const {
  data: userPosts,
  pending: postsPending,
  error,
  refresh: postsRefresh
} = useAsyncData('user-posts', async () => await fetchPostsFromUser(activeUser.value.id), {
  lazy: true
})

const {
  data: connected,
  error: connectedError
} = useAsyncData('connected', async () => await areWeConnected(activeUser.value.id), {
  lazy: true
})
</script>

<template>
  <header>
    <h1 v-if="activeUser">@{{ activeUser.handle }}</h1>
    <p
      v-if="activeUser && activeUser.bio"
      class="bio">
      {{ activeUser.bio }}
    </p>
  </header>
  <div
    class="status"
    v-if="activeUser && user.id !== activeUser.id">
    <Button
      v-if="connected"
      @click="deleteConnection(activeUser.id)"
      >Cortar</Button
    >
    <Button
      variant="primary"
      v-else
      @click="sendConnectionRequest(activeUser.id)"
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
      v-if="activeUser && user.id === activeUser.id"
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
    :id="activeUser.id"
    v-else-if="tab === 'connections'" />
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

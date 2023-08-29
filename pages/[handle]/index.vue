<script setup>
definePageMeta({
  middleware: ['auth']
})

import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'
import { useConnectionsStore } from '@/stores/connections'

const mainStore = useMainStore()
const postStore = usePostStore()
const connectionsStore = useConnectionsStore()
const route = useRoute()
const user = useSupabaseUser()
const tab = ref('content')

const { fetchUserByHandle } = mainStore
const { postBeingEdited, fetchPostsFromUser } = postStore
const { areWeConnected } = connectionsStore


const { data: activeUser, error: activeUserError } = useAsyncData(() =>
  fetchUserByHandle(route.params.handle)
)

const {
  data: posts,
  error: postsError,
  refresh: postsRefresh
} = useAsyncData(() => fetchPostsFromUser(activeUser.value.id))

const connected = async (id) => {
  const data = await areWeConnected(id)
  console.log('conectados?', data)
  return data
 }
</script>

<template>
  <header>
    <h1>@{{ route.params.handle }}</h1>
    <p
      v-if="activeUser.bio"
      class="bio">
      {{ activeUser.bio }}
    </p>
  </header>
  <div
    class="status"
    v-if="user.id !== activeUser.id">
    <Button v-if="connected(activeUser.id) === true">Desconectar</Button>
    <Button variant="primary" v-else>Pedir conexión</Button>
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
      v-if="user.id === activeUser.id"
      value="invitations"
      :selected="tab === 'invitations'"
      @click="tab = 'invitations'">
      Invitaciones
    </Tab>
  </TabMenu>
  <!-- TODO: for the moment it's just for me to invite people -->
  <Invitations v-if="tab === 'invitations'" />
  <Connections :id="activeUser.id" v-if="tab === 'connections'" />
  <div
    v-if="tab === 'content'"
    class="posts">
    <ul>
      <Post
        v-for="post in posts"
        :post="post"
        @deleted="postsRefresh" />
    </ul>
    <EmptyState
      v-if="posts?.length === 0"
      message="Aún no hay nada publicado" />
  </div>
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

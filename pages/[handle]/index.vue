<template>
  <header>
    <h1>@{{ userData.handle }}</h1>
    <p v-if="userData.bio" class="bio">{{ userData.bio }}</p>
    <!-- TODO: for the moment it's just for me to invite people -->
    <Invitation v-if="userData.handle === 'mekanoide'" />
  </header>
  <div class="status" v-if="!itsMe">
    <Button v-if="connected">Desconectar</Button>
    <Button v-else>Solicitar conexión</Button>
  </div>
  <EditPost v-if="store.postBeingEdited" @refresh="postsRefresh" />
  <Posts v-if="postsData.length > 0">
    <Post v-for="post in postsData" :post="post" @edit="startPostEdition" @delete="handleDeletePost" />
  </Posts>
  <EmptyState v-else message="No ha publicado nada aún" />
</template>

<script setup>
import { useMainStore } from '@/stores/main'
const store = useMainStore()

const route = useRoute()
const client = useSupabaseClient()
const user = useSupabaseUser()

const { startPostEdition } = store

const posts = ref(null)
posts.value = store.fetchPostsFromUser(route.params.id)

const { data: userData, pending: parentPending } = await useAsyncData('user', async () => {
  const { data } = await client
    .from('users')
    .select()
    .eq('handle', route.params.handle)
    .maybeSingle()
  return data
})

const { data: connectionsData, pending: connectionsPending } = await useAsyncData(
  'connections',
  async () => {
    const { data } = await client
      .from('connections')
      .select()
      .eq('user_1', user.value.id)
      .eq('user_2', user.value.id)
    console.log('Connections', data)
    return data
  }
)

const {
  data: postsData,
  error: postsError,
  refresh: postsRefresh
} = await useAsyncData('posts', async () => {
  const { data, error } = await client
    .from('posts')
    .select('*, users(id, handle)')
    .eq('author_id', userData.value.id)
    .order('created_at', { ascending: false })
  if (error) {
    throw error
  }
  if (data) {
    return data
  }
})

/* Delete post */

const handleDeletePost = async (id) => {
  postsRefresh()
}

const connected = computed(() => {
  return
})

const itsMe = computed(async () => {
  return user.value.id = userData.id
})
</script>

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
</style>

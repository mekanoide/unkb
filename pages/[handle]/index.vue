<script setup>
import { useMainStore } from '@/stores/main'
const store = useMainStore()

const route = useRoute()
const client = useSupabaseClient()
const user = useSupabaseUser()

const { fetchPostsFromUser } = store

/* Fetch user data */
const { data: userData, pending: userPending } = await client
  .from('users')
  .select()
  .eq('handle', route.params.handle)
  .maybeSingle()

/* Fetch posts from user */
const {
  data: posts,
  error: postsError,
  refresh: postsRefresh
} = await client
  .from('posts')
  .select('*, users(id, handle)')
  .eq('author_id', userData.id)
  .order('created_at', { ascending: false })

/* Check user is not themselves */
const itsMe = computed(async () => {
  return (user.value.id = userData.id)
})
</script>

<template>
  <div v-if="userPending">Cargando...</div>
  <div v-else>
    <header>
      <h1>@{{ route.params.handle }}</h1>
      <p v-if="userData.bio" class="bio">{{ userData.bio }}</p>
      <!-- TODO: for the moment it's just for me to invite people -->
      <Invitation v-if="userData.handle === 'mekanoide'" />
    </header>
    <div class="status" v-if="!itsMe">
      <Button v-if="connected">Desconectar</Button>
      <Button v-else>Solicitar conexión</Button>
    </div>
    <EditPost v-if="store.postBeingEdited" @refresh="postsRefresh" />
    <Posts>
      <Post v-for="post in posts" :post="post" @deleted="postsRefresh" />
    </Posts>
    <EmptyState v-if="posts?.length === 0" message="Aún no hay nada publicado" />
  </div>
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
</style>

<script setup>
definePageMeta({
  middleware: ['auth']
})

import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

const store = useMainStore()

const route = useRoute()
const user = useSupabaseUser()

const { posts, activeUser } = storeToRefs(store)
const { fetchPostsFromUser, fetchUserByHandle } = store

/* Check user is not themselves */
const itsMe = computed(async () => {
  return (user.value.id = activeUser.value.id)
})

await fetchUserByHandle(route.params.handle)
await fetchPostsFromUser(activeUser.value.id)
</script>

<template>
  <header>
    <h1>@{{ route.params.handle }}</h1>
    <p v-if="activeUser.bio" class="bio">{{ activeUser.bio }}</p>
    <!-- TODO: for the moment it's just for me to invite people -->
    <Invitation v-if="activeUser.handle === 'mekanoide'" />
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

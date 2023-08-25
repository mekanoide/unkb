<script setup>
definePageMeta({
  middleware: ['auth']
})

import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

const store = useMainStore()

const route = useRoute()
const user = useSupabaseUser()

const { fetchPostsFromUser, fetchUserByHandle } = store

const { data: activeUser, error: activeUserError } = await useAsyncData(() => {
  return fetchUserByHandle(route.params.handle)
})
const { data: posts, error: postsError } = await useAsyncData(() => {
  return fetchPostsFromUser(activeUser.value.id)
})

/* Check user is not themselves */
const itsMe = computed(async () => {
  return (user.value.id = activeUser.value.id)
})
</script>

<template>
  <header>
    <h1>@{{ route.params.handle }}</h1>
    <p v-if="activeUser.bio" class="bio">{{ activeUser.bio }}</p>
  </header>
  <!-- TODO: for the moment it's just for me to invite people -->
  <Invitation v-if="activeUser.handle === 'mekanoide'" />
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

h1 {
  text-transform: none;
}
</style>

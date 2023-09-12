<script setup>
definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser()

import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'
const store = useMainStore()
const postStore = usePostStore()
const route = useRoute()

const { showPopover } = storeToRefs(store)
const { postBeingEdited } = storeToRefs(postStore)
const { togglePopover } = store
const { createReply, startPostEdition, deletePost } = postStore

const { data: post, refresh: refreshPost } = await useFetch(
  `/api/v1/posts/${route.params.id}`
)

const { data: replies, refresh: repliesRefresh } = await useFetch(
  `/api/v1/replies/${route.params.id}`
)

const handleEdit = () => {
  startPostEdition(post.value.id, post.value.content)
  showPopover.value = null
}

const handleDelete = async () => {
  await deletePost(props.post.id)
  emit('deleted')
  showPopover.value = null
}

const handleReply = async () => {
  await createReply(route.params.id)
  repliesRefresh()
}

const isOwner = computed(() => {
  return post.value.author_id === user.value.id
})

const date = computed(() => formatDate(post.value.created_at))
</script>

<template>
  <div class="Post">
    <div class="post">
      <header>
        <User
          v-if="post"
          :data="post.users"
          size="large" />
        <div class="actions">
          <Button
            variant="ghost"
            size="small"
            @click.stop="togglePopover(post.id)">
            <Icon
              name="ph:dots-three-bold"
              size="1.5rem" />
          </Button>
          <Dropdown
            class="menu"
            v-if="showPopover === post.id">
            <Menu v-if="isOwner">
              <MenuItem @click="handleEdit">Editar</MenuItem>
              <MenuItem @click="handleDelete">Eliminar</MenuItem>
            </Menu>
            <Menu v-else>
              <MenuItem>Denunciar</MenuItem>
            </Menu>
          </Dropdown>
        </div>
      </header>
      <PostContent
        v-if="post"
        :content="post.content" />
      <time :datetime="date">{{ date }}</time>
    </div>
    <PostEditor
      id="write-reply"
      :rows="2"
      @post="handleReply"
      placeholder="Escribe una respuesta" />
    <ul v-if="replies && replies.length > 0">
      <Reply
        v-for="reply in replies"
        :data="reply"
        :key="reply.id"
        @deleted="repliesRefresh" />
    </ul>
    <EmptyState
      v-else
      message="No hay respuestas" />
    <EditPost
      v-if="postBeingEdited"
      @edited="repliesRefresh" />
  </div>
</template>

<style scoped>
header {
  display: flex;
  gap: var(--spaceS);
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.Post {
  display: grid;
  gap: var(--spaceL);
}

.menu {
  right: 0;
  top: 3rem;
}
</style>

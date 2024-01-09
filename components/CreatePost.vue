<script setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/stores/posts'
import { useUserStore } from '@/stores/user'
import { v4 as uuid } from 'uuid'

const postsStore = usePostsStore()
const userStore = useUserStore()

const { createPost, submitPost } = postsStore
const { showCreatePost } = storeToRefs(postsStore)
const { defaultScope } = storeToRefs(userStore)

const content = ref('')
const scope = ref('connections')

const pendingPost = ref(false)

const handlePost = () => {
  submitPost(content.value, scope.value)
}

const cancelCreation = () => {
  showCreatePost.value = false
}
</script>

<template>
  <Modal class="CreatePost">
    <form @submit.prevent="handlePost">
      <header>
        Visibilidad:
        <ScopeSelector v-model="scope" />
      </header>
      <textarea
        cols="50"
        rows="16"
        v-model="content"
        placeholder="Tu contenido se guardará como nota automáticamente"></textarea>
      <Footer>
        <Actions>
          <Button
            variant="primary"
            type="submit">
            {{ scope !== 'private' ? 'Publicar' : 'Guardar' }}
          </Button>
          <Button
            variant="secondary"
            @click="cancelCreation">
            Cancelar
          </Button>
        </Actions>
        <WordCount :count="content.length" />
      </Footer>
    </form>
  </Modal>
</template>

<style scoped>
.CreatePost {
  padding: var(--spaceM);
}

header {
  display: flex;
  gap: var(--spaceS);
  align-items: center;
}

form {
  height: 80vh;
  display: grid;
  gap: var(--spaceM);
  grid-template-rows: auto 1fr auto;
}
</style>

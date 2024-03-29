<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { usePostsStore } from '@/stores/posts'
import { useEditionStore } from '@/stores/edition'

const store = useMainStore()
const editionStore = useEditionStore()
const postsStore = usePostsStore()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['deleted', 'changed'])

const contentElement = ref(null)

const { showPopover } = storeToRefs(store)
const { openEdition } = editionStore
const { deleteIdea } = postsStore

const date = computed(() => formatFormalDate(props.data.created_at))

const handlePublish = async () => {
  showPopover.value = null
  const shouldPublish = confirm('¿Seguro que quieres publicar esta nota?')
  if (!shouldPublish) return
  await useFetch('api/v1/notes/publish', {
    method: 'post',
    body: {
      id: props.data.id
    }
  })
  emit('changed')
}

const toggleMenu = () => {
  showPopover.value = showPopover.value === props.data.id ? null : props.data.id
}

const handleEdition = () => {
  openEdition(props.data.id, props.data.content, 'post', 'private')
  showPopover.value = null
}

const handleSavePost = async (id, pinned) => {
  await useFetch('/api/v1/notes/pin', {
    method: 'post',
    body: {
      id: id,
      pinned: pinned
    }
  })
  emit('changed')
}

const handleDelete = () => {
  showPopover.value = null
  deleteIdea(props.data.id)
}
</script>

<template>
  <div class="Note">
    <Header>
      <div class="post-meta">
        <time :datetime="date">{{ date }}</time>
      </div>
      <Button
        variant="ghost"
        size="small"
        @click="toggleMenu">
        <Icon
          name="ph:dots-three-bold"
          size="1.5rem" />
      </Button>
      <Dropdown
        class="menu"
        v-if="showPopover === data.id"
        @close="showPopover = null">
        <Menu>
     <!-- <MenuItem @click="handlePublish">
            <Icon
              name="ph:paper-plane-right-bold"
              size="1.25rem" />
            Publicar
          </MenuItem> -->
<!--           <MenuItem @click="handleSavePost(data.id, data.pinned)">
            <Icon
            :name="data.pinned ? 'ph:push-pin-simple-slash-bold' : 'ph:push-pin-simple-bold'"
            size="1.25rem" />
            {{ data.pinned ? 'Desfijar nota' : 'Fijar nota' }}
          </MenuItem> -->
          <MenuItem @click="handleEdition">
            Editar
          </MenuItem>
          <MenuItem @click="handleDelete">
            Eliminar
          </MenuItem>
        </Menu>
      </Dropdown>
    </Header>
    <div
      class="content"
      role="link"
      ref="contentElement">
      <PostContent :content="data.content" />
    </div>
    <LinkPreview
      v-if="data.link"
      :data="data.link" />
  </div>
</template>

<style scoped>
.Note {
  padding: var(--spaceL) 0;
  display: grid;
  gap: var(--spaceM);
}

.menu {
  right: 0;
  top: 2rem;
}

.content {
  max-width: 100%;
  position: relative;
}
</style>

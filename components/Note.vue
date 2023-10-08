<script setup>
import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'
import { useEditionStore } from '@/stores/edition'

const store = useMainStore()
const editionStore = useEditionStore()
const postStore = usePostStore()

const user = useSupabaseUser()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['deleted', 'changed'])

const contentElement = ref(null)

const { showPopover } = storeToRefs(store)
const { deletePost } = postStore
const { openEdition } = editionStore

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
  openEdition(props.data.id, props.data.content, 'note', 'private')
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

const handleDelete = async () => {
  await deletePost(props.data.id)
  emit('changed')
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
          <MenuItem @click="handlePublish">
            <Icon
              name="ph:paper-plane-right-bold"
              size="1.25rem" />
            Publicar
          </MenuItem>
          <MenuItem @click="handleEdition">
            <Icon
              name="ph:pencil-simple-line-bold"
              size="1.25rem" />
            Editar
          </MenuItem>
          <MenuItem @click="handleDelete">
            <Icon
              name="ph:trash-simple-bold"
              size="1.25rem" />
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
    <Footer>
      <div class="actions">
        <Button
          variant="ghost"
          :title="data.pinned ? 'Quitar de favoritos' : 'Guardar en favoritos'"
          @click="handleSavePost(data.id, data.pinned)">
          <Icon
            :name="data.pinned ? 'ph:push-pin-simple-slash-bold' : 'ph:push-pin-simple-bold'"
            size="1.5rem" />
        </Button>
      </div>
    </Footer>
  </div>
</template>

<style scoped>
.Note {
  display: grid;
  gap: var(--spaceS);
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

<script setup>
import { useEditionStore } from '@/stores/edition'
import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'

const router = useRouter()
const user = useSupabaseUser()
const store = useMainStore()
const editionStore = useEditionStore()
const postStore = usePostStore()

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  single: {
    type: Boolean
  }
})
const emit = defineEmits(['changed', 'deleted'])

const contentElement = ref(null)
const truncate = ref(false)
const expanded = ref(false)

const { showPopover } = storeToRefs(store)
const { openEdition } = editionStore
const { startPostEdition, deletePost, fetchPostAuthor, fetchReplyCount } =
  postStore

const isOwner = computed(() => {
  return props.data.author_id === user.value.id
})

const date = computed(() => formatFormalDate(props.data.created_at))

const transformedScope = computed(() => {
  switch (props.data.scope) {
    case 'public':
      return 'público'
    case 'connections':
      return 'conexiones'
    case 'trust':
      return 'confianza'
    case 'fire':
      return 'círculo de fuego'
  }
})

const linkPost = (id) => {
  router.push(`/post/${id}`)
}

const handleEdition = () => {
  openEdition(props.data.id, props.data.content, 'post', props.data.scope)
  showPopover.value = null
}

const handleDelete = async () => {
  showPopover.value = null
  const shouldDelete = confirm('¿Estás seguro de eliminar esta publicación?')
  if (!shouldDelete) return
  await useFetch('/api/v1/posts/delete', {
    method: 'delete',
    body: {
      id: props.data.id
    }
  })
  emit('deleted')
}

const toggleExpanded = () => {
  expanded.value = !expanded.value
}

const toggleMenu = () => {
  if (showPopover.value === props.data.id) {
    showPopover.value = null
  } else {
    showPopover.value = props.data.id
  }
}

const handleSavePost = async (id) => {
  await useFetch('/api/v1/bookmarks/posts/create', {
    method: 'put',
    body: {
      id: id
    }
  })
  emit('changed')
}

const handleLinkPost = (id) => {
  if (!props.single) {
    linkPost(id)
  }
}

const replyCount = await fetchReplyCount(props.data.id)

/* Get content height in order to whether truncate it or not */

onMounted(() => {
  if (!props.single) {
    truncate.value = contentElement.value.clientHeight > 666
  }
})
</script>

<template>
  <div class="Post">
    <Header>
      <div class="post-meta">
        <User :data="data.users" />
        <div class="metadata">
          <time :datetime="date">{{ date }}</time>
          <span> • {{ transformedScope }}</span>
          <span v-if="data.edited"> • editado</span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="small"
        title="Más opciones"
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
          <MenuItem
            v-if="isOwner"
            @click="handleEdition">
            <Icon name="ph:pencil-simple-line-bold" size="1.25rem" />
            Editar
          </MenuItem>
          <MenuItem
            v-if="isOwner"
            @click="handleDelete">
            <Icon name="ph:trash-simple-bold" size="1.25rem" />
            Eliminar
          </MenuItem>
          <MenuItem
            v-if="!isOwner"
            @click="handleReport">
            <Icon name="ph:warning-bold" size="1.25rem" />
            Denunciar
          </MenuItem>
        </Menu>
      </Dropdown>
    </Header>
    <div
      class="content"
      :class="{ truncate: truncate && !expanded, single: single }"
      role="link"
      ref="contentElement"
      @click.prevent="handleLinkPost(data.id)">
      <PostContent :content="data.content" />
    </div>
    <Truncate
      v-if="truncate"
      :expanded="expanded"
      @click="toggleExpanded" />
    <LinkPreview
      v-if="data.link"
      :data="data.link" />
    <Footer>
      <div
        v-if="!single"
        class="actions">
        <NuxtLink
          class="link-reply"
          title="Ver respuestas"
          :to="`/post/${data.id}#write-reply`">
          <Icon
            name="ph:chat-bold"
            size="1.5rem" />
          {{ replyCount }}
        </NuxtLink>
        <Button
          variant="ghost"
          :title="data.fav ? 'Quitar de favoritos' : 'Guardar en favoritos'"
          @click="handleSavePost(data.id)">
          <Icon
            :name="data.fav ? 'ph:push-pin-simple-slash-bold' : 'ph:push-pin-simple-bold'"
            size="1.5rem" />
        </Button>
      </div>
      <Button
        v-if="data.scope === 'public'"
        title="Compartir publicación"
        variant="ghost">
        <Icon
          name="ph:share-network-bold"
          size="1.5rem" />
      </Button>
    </Footer>
  </div>
</template>

<style scoped>
.Post {
  display: grid;
  gap: var(--spaceM);
}

.author {
  font-weight: bold;
}

.post-meta {
display: grid;
gap: var(--spaceXS);
}

.menu {
  right: 0;
  top: 2rem;
}

.content {
  max-width: 100%;
  position: relative;
}

.content:not(.single) {
  cursor: pointer;
}

.content:not(.single)::before {
  position: absolute;
  inset: -1rem;
  content: '';
  transition: var(--transition);
  border: 0px dotted var(--colorAccent);
}
.content:not(.single):hover::before {
  position: absolute;
  inset: 0 calc(var(--spaceS) * -1);
  content: '';
  border-left: 6px solid var(--colorAccent);
  border-right: 6px solid var(--colorAccent);
}

.content.truncate {
  overflow: hidden;
  max-height: 665px;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spaceS);
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metadata {
  font-size: var(--fontS);
  text-transform: uppercase;
}

.link-reply {
  display: flex;
  height: 2rem;
  gap: var(--spaceXS);
  border-radius: var(--corner);
  padding: 0 var(--spaceS);
  align-items: center;
}

.link-reply:hover {
  background-color: var(--colorAccent);
  color: var(--colorDark);
}
</style>

<script setup>
import { storeToRefs } from 'pinia'
import { useEditionStore } from '@/stores/edition'
import { useMainStore } from '@/stores/main'
import { usePostsStore } from '@/stores/posts'

const user = useSupabaseUser()
const mainStore = useMainStore()
const editionStore = useEditionStore()
const postsStore = usePostsStore()

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

const { showPopover } = storeToRefs(mainStore)
const { openEdition } = editionStore
const { startPostEdition, deletePost, fetchPostAuthor, fetchReplyCount } =
  postsStore

const isOwner = computed(() => {
  if (user.value === null) return false
  return props.data.author_id === user.value.id
})

const date = computed(() => formatFormalDate(props.data.created_at))

const replyText = computed(() => {
  if (replyCount === 0) return 'Sin respuestas'
  if (replyCount === 1) return '1 respuesta'
  return `${replyCount} respuestas`
})

const transformedScope = computed(() => {
  switch (props.data.scope) {
    case 'public':
      return 'público'
    case 'connections':
      return 'vínculos'
    case 'trust':
      return 'gente de confianza'
    case 'fire':
      return 'círculo de fuego'
  }
})

const linkPost = (id) => {
  navigateTo(`/post/${id}`)
}

const handleEdition = () => {
  openEdition(props.data.id, props.data.content, 'post', props.data.scope)
  showPopover.value = null
}

const handleDelete = async () => {
  showPopover.value = null
  await deletePost(props.data.id)
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

const handleLinkPost = (id) => {
  if (!props.single) {
    linkPost(id)
  }
}

const replyCount = await fetchReplyCount(props.data.id)

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
            Editar
          </MenuItem>
          <MenuItem
            v-if="isOwner"
            @click="handleDelete">
            Eliminar
          </MenuItem>
          <MenuItem
            v-if="!isOwner"
            @click="handleReport">
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
      @click="handleLinkPost(data.id)">
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
          {{ replyText }}
        </NuxtLink>
      </div>
    </Footer>
  </div>
</template>

<style scoped>
.Post {
  padding: var(--spaceL) 0;
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

.metadata {
  font-size: var(--fontS);
  text-transform: uppercase;
}

.link-reply {
  display: flex;
  height: 2rem;
  text-transform: uppercase;
  font-weight: bold;
  gap: var(--spaceXS);
  border-radius: var(--cornerButton);
  padding: var(--spaceS) 0;
  align-items: center;
}
</style>

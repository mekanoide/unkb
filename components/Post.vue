<script setup>
import { useEditionStore } from '@/stores/edition'
import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'
import { storeToRefs } from 'pinia'
const router = useRouter()
const user = useSupabaseUser()
const store = useMainStore()
const editionStore = useEditionStore()
const postStore = usePostStore()

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  single: {
    type: Boolean
  }
})
const emit = defineEmits(['deleted', 'edited'])

const contentElement = ref(null)
const truncate = ref(false)
const expanded = ref(false)

const { showPopover } = storeToRefs(store)

const { openEdition } = editionStore
const { startPostEdition, deletePost, fetchPostAuthor, fetchReplyCount } =
  postStore

const isOwner = computed(() => {
  return props.post.author_id === user.value.id
})

const date = computed(() => formatDate(props.post.created_at))

const linkPost = (id) => {
  router.push(`/post/${id}`)
}

const handleEdit = () => {
  openEdition('post', props.post.id, props.post.content)
}

const handleDelete = async () => {
  await deletePost(props.post.id)
  emit('deleted')
  showPopover.value = null
}

const toggleExpanded = () => {
  expanded.value = !expanded.value
}

/* TODO: maybe try on the list? */

const handleSavePost = async (id) => {
  await useFetch('/api/v1/bookmarks/posts/create', {
    method: 'put',
    body: {
      id: id
    }
  })
}

const handleLinkPost = (id) => {
  if (!props.single) {
    linkPost(id)
  }
}

const replyCount = await fetchReplyCount(props.post.id)

/* Get content height in order to whether truncate it or not */

onMounted(() => {
  if (!props.single) {
    truncate.value = contentElement.value.clientHeight > 666
  }
})
</script>

<template>
  <div class="Post">
    <header>
      <User :data="post.users" />
      • <time :datetime="date">{{ date }}</time>
      <span v-if="post.edited"> • editado</span>
    </header>
    <div
      class="content"
      :class="{ truncate: truncate && !expanded, single: single }"
      role="link"
      ref="contentElement"
      @click.prevent="handleLinkPost(post.id)">
      <PostContent :content="post.content" />
    </div>
    <Truncate
      v-if="truncate"
      :expanded="expanded"
      @click="toggleExpanded" />
    <LinkPreview
      v-if="post.link"
      :data="post.link" />
    <footer>
      <div
        v-if="!single"
        class="actions">
        <NuxtLink
          class="link-reply"
          title="Ver respuestas"
          :to="`/post/${post.id}#write-reply`">
          <Icon
            name="ph:chat-bold"
            size="1.25rem" />
          {{ replyCount }}
        </NuxtLink>
        <Button
          variant="ghost"
          title="Guardar publicación"
          @click="handleSavePost(post.id)">
          <Icon
            name="ph:bookmark-simple-bold"
            size="1.25rem" />
        </Button>
      </div>
      <div class="actions">
        <Button
          v-if="isOwner"
          variant="ghost"
          title="Editar publicación"
          @click="handleEdit">
          <Icon
            name="ph:pencil-simple-line-bold"
            size="1.25rem" />
        </Button>
        <Button
          v-if="isOwner"
          variant="ghost"
          title="Eliminar publicación"
          @click="handleDelete">
          <Icon
            name="ph:trash-simple-bold"
            size="1.25rem" />
        </Button>
        <Button
          v-if="!isOwner"
          variant="ghost"
          title="Denunciar publicación">
          <Icon
            name="ph:flag-pennant-bold"
            size="1.25rem" />
        </Button>
      </div>
    </footer>
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

header {
  display: flex;
  gap: var(--spaceS);
  justify-content: start;
  align-items: center;
}

.content {
  max-width: 100%;
  position: relative;
}

.content:not(.single) {
  cursor: pointer;
}

.content:not(.single):hover::before {
  position: absolute;
  inset: 0 -1rem;
  content: '';
  border-left: 8px solid var(--colorText);
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

.menu {
  top: 3rem;
  right: 0;
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
  background-color: var(--colorText);
  color: var(--colorBackground);
}
</style>

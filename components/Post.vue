<script setup>
import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'
import { storeToRefs } from 'pinia'
const router = useRouter()
const user = useSupabaseUser()
const store = useMainStore()
const postStore = usePostStore()

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  reply: {
    type: Boolean
  }
})
const emit = defineEmits(['deleted', 'edited'])

const contentElement = ref(null)
const truncate = ref(false)
const expanded = ref(false)
const link = ref(null)

const { showPopover } = storeToRefs(store)

const { togglePopover } = store
const { startPostEdition, deletePost, fetchPostAuthor, fetchReplyCount } =
  postStore

const postAuthor = props.post.reply_to
  ? await fetchPostAuthor(props.post.reply_to)
  : null

const isOwner = computed(() => {
  return props.post.author_id === user.value.id
})

const date = computed(() => formatDate(props.post.created_at))

const linkPost = (id) => {
  router.push(`/post/${id}`)
}

const handleEdit = () => {
  startPostEdition(props.post.id, props.post.content)
  showPopover.value = null
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

const replyCount = await fetchReplyCount(props.post.id)

/* Get content height in order to whether truncate it or not */

onMounted(() => {
  truncate.value = contentElement.value.clientHeight > 666
})
</script>

<template>
  <li class="Post">
    <header>
      <User :data="post.users" />
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
    </header>
    <div
      class="content"
      :class="{ truncate: truncate && !expanded }"
      role="link"
      ref="contentElement"
      @click.prevent="linkPost(post.id)">
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
        v-if="!reply"
        class="actions">
        <NuxtLink
          class="link-reply"
          :to="`/post/${post.id}#write-reply`">
          <Icon
            name="ph:chat-bold"
            size="1.5rem" />
          {{ replyCount }}
        </NuxtLink>
        <Button
          variant="ghost"
          @click="handleSavePost(post.id)">
          <Icon
            name="ph:bookmark-simple-bold"
            size="1.5rem" />
        </Button>
      </div>
      <div>
        <small>
          <time :datetime="date">{{ date }}</time>
        </small>
        <small v-if="post.edited"> - editado</small>
      </div>
    </footer>
  </li>
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
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto;
  position: relative;
}

.content {
  max-width: 100%;
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

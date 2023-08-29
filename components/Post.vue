<script setup>
import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'
import { storeToRefs } from 'pinia'
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

const handleEdit = () => {
  startPostEdition(props.post.id, props.post.content)
  showPopover.value = null
}

const handleDelete = async () => {
  await deletePost(props.post.id)
  showPopover.value = null
  emit('deleted')
}

const toggleExpanded = () => {
  expanded.value = !expanded.value
}

const replyCount = await fetchReplyCount(props.post.id)

/* Get content height in order to whether truncate it or not */
onMounted(() => {
  console.log('Height', contentElement.value.clientHeight)
  truncate.value = contentElement.value.clientHeight > 666
})
</script>

<template>
  <li>
    <header>
      <User :data="post.users" />
      <div class="actions">
        <Button
          variant="ghost"
          size="small"
          @click.stop="togglePopover(post.id)">
          <Icon
            name="carbon:overflow-menu-horizontal"
            size="1.5rem" />
        </Button>
      </div>
    </header>
    <div v-if="post.reply_to">En respuesta a <User :data="postAuthor" /></div>
    <NuxtLink
      class="post-link"
      :to="post.reply_to ? `/post/${post.reply_to}` : `/post/${post.id}`">
      <div
        class="content"
        :class="{ truncate: truncate && !expanded }"
        ref="contentElement">
        <PostContent :content="post.content" />
      </div>
    </NuxtLink>
    <Truncate
      v-if="truncate"
      :expanded="expanded"
      @click="toggleExpanded" />
    <footer v-if="replyCount > 0">
      <div>
        <small>
          <time :datetime="date">{{ date }}</time>
        </small>
        <small v-if="post.edited"> - editado</small>
      </div>
      <div class="reply-count">
        <Icon
          name="carbon:chat"
          size="1.5rem" />
        {{ replyCount }}
      </div>
    </footer>
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
  </li>
</template>

<style scoped>
.author {
  font-weight: bold;
}

header {
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
}

.content {
  max-width: 100%;
}

.content.truncate {
  overflow: hidden;
  max-height: 665px;
}

.actions {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: var(--spaceS);
}

.menu {
  top: 3.5rem;
  right: 0;
}

.reply-count {
  margin-top: var(--spaceS);
}
</style>

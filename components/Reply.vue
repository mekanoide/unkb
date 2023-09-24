<script setup>
import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'
import { useEditionStore } from '@/stores/edition'

const user = useSupabaseUser()

const store = useMainStore()
const postStore = usePostStore()
const editionStore = useEditionStore()

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  child: {
    type: Boolean
  }
})
const emit = defineEmits(['deleted', 'edited'])

const contentElement = ref(null)
const truncate = ref(false)
const expanded = ref(false)
const showReply = ref(false)

const { showPopover } = storeToRefs(store)
const { deleteReply, fetchReplyCount, createReply } = postStore
const { openEdition } = editionStore

const isOwner = computed(() => {
  return props.data.author_id === user.value.id
})

const date = computed(() => formatFormalDate(props.data.created_at))

const handleEdit = () => {
  openEdition(props.data.id, props.data.content, 'reply', null)
}

const handleReply = async (content, scope) => {
  console.log('handleReply', content, scope)
  await createReply(props.data.post_id, content, props.data.id)
  refreshReplies()
}

const handleDelete = async () => {
  await deleteReply(props.data.id)
  emit('deleted')
}

const toggleExpanded = () => {
  expanded.value = !expanded.value
}

const toggleReply = () => {
  showReply.value = !showReply.value
}

const replyCount = await fetchReplyCount(props.data.id)

/* Get content height in order to whether truncate it or not */
onMounted(() => {
  truncate.value = contentElement.value.clientHeight > 666
})
</script>

<template>
  <li
    class="Reply"
    :class="{ child: child }">
    <Header>
      <div class="post-meta">
        <User :data="data.users" />
        • <time :datetime="date">{{ date }}</time>
        <span v-if="data.edited"> • editado</span>
      </div>
      <Button
        variant="ghost"
        size="small"
        @click="showPopover = data.id">
        <Icon
          name="ph:dots-three-bold"
          size="1.5rem" />
      </Button>
      <Dropdown
        v-if="showPopover === data.id"
        class="menu"
        @close="showPopover = null">
        <Menu>
          <MenuItem
            v-if="isOwner"
            @click="handleEdit">
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
      :class="{ truncate: truncate && !expanded }"
      ref="contentElement">
      <PostContent :content="data.content" />
    </div>
    <Truncate
      v-if="truncate"
      :expanded="expanded"
      @click="toggleExpanded" />
    <Footer>
      <Button
        variant="text"
        size="small"
        @click="toggleReply">
        Responder
      </Button>
    </Footer>
    <PostEditor
      v-if="showReply"
      postType="reply"
      cancel
      @post="handleReply"
      @cancel="showReply = false" />
    <Reply
      child
      v-for="reply in data.children"
      :data="reply"
      :key="reply.id" />
  </li>
</template>

<style scoped>
.Reply {
  display: grid;
  gap: var(--spaceS);
}

.Reply.child {
  padding-left: var(--spaceM);
  border-left: 2px dotted var(--colorText);
}
.menu {
  top: 0rem;
  right: 0;
}

.author {
  font-weight: bold;
}

.post-meta {
  display: flex;
  gap: var(--spaceS);
  justify-content: flex-start;
  align-items: center;
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
</style>

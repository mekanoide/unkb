<script setup>
import { storeToRefs } from 'pinia'
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
const emit = defineEmits(['refresh'])

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

const handleEdition = () => {
  showPopover.value = null
  openEdition(props.data.id, props.data.content, 'reply', null)
}

const handleReply = async (content, scope = null) => {
  await createReply(props.data.post_id, content, props.data.id)
  showReply.value = false
  emit('refresh')
}

const handleDelete = async () => {
  await deleteReply(props.data.id)
  showPopover.value = null
  emit('refresh')
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
        <div class="metadata">
          <time :datetime="date">{{ date }}</time>
          <span v-if="data.edited"> • editado</span>
        </div>
      </div>
      <Button
        v-if="user"
        variant="ghost"
        size="small"
        title="Más opciones"
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
            @click="handleEdition">
            <Icon
              name="ph:pencil-simple-line-bold"
              size="1.25rem" />
            Editar
          </MenuItem>
          <MenuItem
            v-if="isOwner"
            @click="handleDelete">
            <Icon
              name="ph:trash-simple-bold"
              size="1.25rem" />
            Eliminar
          </MenuItem>
          <MenuItem
            v-if="!isOwner"
            @click="handleReport">
            <Icon
              name="ph:warning-bold"
              size="1.25rem" />
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
        v-if="user"
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
    <ul v-if="data.children && data.children.length > 0">
      <Reply
        child
        v-for="reply in data.children"
        :data="reply"
        :key="reply.id" />
    </ul>
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
  top: 2rem;
  right: 0;
}

.author {
  font-weight: bold;
}

.post-meta {
  display: grid;
  gap: var(--spaceXS);
}

.metadata {
  font-size: var(--fontS);
  text-transform: uppercase;
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

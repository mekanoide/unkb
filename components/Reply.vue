<script setup>
import { useMainStore } from '@/stores/main'
import { usePostStore } from '@/stores/post'

const user = useSupabaseUser()
const store = useMainStore()
const postStore = usePostStore()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['deleted', 'edited'])

const contentElement = ref(null)
const truncate = ref(false)
const expanded = ref(false)

const { showPopover } = storeToRefs(store)

const { togglePopover } = store
const { startPostEdition, deleteReply, fetchPostAuthor, fetchReplyCount } =
  postStore

const isOwner = computed(() => {
  return props.data.author_id === user.value.id
})

const date = computed(() => formatFormalDate(props.data.created_at))

const handleEdit = () => {
  startPostEdition(props.data.id, props.data.content)
  showPopover.value = null
}

const handleDelete = async () => {
  await deleteReply(props.data.id)
  showPopover.value = null
  emit('deleted')
}

const toggleExpanded = () => {
  expanded.value = !expanded.value
}

const startReply = () => {
  
}

const replyCount = await fetchReplyCount(props.data.id)

/* Get content height in order to whether truncate it or not */
onMounted(() => {
  truncate.value = contentElement.value.clientHeight > 666
})
</script>

<template>
  <li>
    <header>
      <User :data="data.users" />
      <div class="actions">
        <Button
          variant="ghost"
          size="small"
          @click.stop="togglePopover(data.id)">
          <Icon
            name="ph:dots-three-bold"
            size="1.5rem" />
        </Button>
      </div>
    </header>
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
    <footer>
      <Button variant="ghost" @click="startReply">Responder</Button>
      <div>
        <small>
          <time :datetime="date">{{ date }}</time>
        </small>
        <small v-if="data.edited"> - editado</small>
      </div>
    </footer>
    <Dropdown
      class="menu"
      v-if="showPopover === data.id">
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
  grid-template-columns: 1fr auto;
  position: relative;
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
</style>

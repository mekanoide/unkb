<script setup>
import { useEditionStore } from '@/stores/edition'
const router = useRouter()
const user = useSupabaseUser()
const editionStore = useEditionStore()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['deleted', 'edited'])

const contentElement = ref(null)

const { openEdition } = editionStore

const isOwner = computed(() => {
  return props.data.author_id === user.value.id
})

const date = computed(() => formatFormalDate(props.data.created_at))

const linkPost = (id) => {
  router.push(`/post/${id}`)
}

const handleEdition = () => {
  openEdition('note', props.data.id, props.data.content)
}

const handleDelete = async () => {
  await deletePost(props.data.id)
  emit('deleted')
  showPopover.value = null
}

const handleLinkPost = (id) => {
  if (!props.single) {
    linkPost(id)
  }
}
</script>

<template>
  <div class="Note">
    <header>
      <time :datetime="date">{{ date }}</time>
    </header>
    <div
      class="content"
      role="link"
      ref="contentElement">
      <PostContent :content="data.content" />
    </div>
    <LinkPreview
      v-if="data.link"
      :data="data.link" />
    <footer>
      <Button variant="ghost">
        <Icon
          name="ph:paper-plane-right-bold"
          size="1.25rem" />
          Publicar
    </Button>
      <div class="actions">
        <Button
          v-if="isOwner"
          variant="ghost"
          title="Editar nota"
          @click="handleEdition">
          <Icon
            name="ph:pencil-simple-line-bold"
            size="1.25rem" />
        </Button>
        <Button
          v-if="isOwner"
          variant="ghost"
          title="Eliminar nota"
          @click="handleDelete">
          <Icon
            name="ph:trash-simple-bold"
            size="1.25rem" />
        </Button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.Note {
  display: grid;
  gap: var(--spaceM);
}

.content {
  max-width: 100%;
  position: relative;
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

<script setup>
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
const user = useSupabaseUser()
const store = useMainStore()
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['deleted', 'edited'])

const { showPopover } = storeToRefs(store)

const { startPostEdition, togglePopover, deletePost, fetchPostAuthor } = store

const postAuthor = props.post.reply_to ? await fetchPostAuthor(props.post.reply_to) : null

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
</script>

<template>
  <li>
    <header>
      <div>
        <User :user="post.users" /> <time :datetime="date">{{ date }}</time>
      </div>
      <div class="actions">
        <Button variant="ghost" size="small" @click.stop="togglePopover(post.id)">
          <Icon name="carbon:overflow-menu-horizontal" size="1.5rem" />
        </Button>
      </div>
    </header>
    <NuxtLink class="post-link" :to="post.reply_to ? `/post/${post.reply_to}` : `/post/${post.id}`">
      <div v-if="post.reply_to">En respuesta a <User :user="postAuthor" /></div>
      <div class="content">
        <PostContent :content="post.content" />
      </div>
      <small v-if="post.edited">Editado</small>
    </NuxtLink>
    <Dropdown class="menu" v-if="showPopover === post.id">
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
li {
  padding: var(--spaceM) 0;
  position: relative;
  width: 100%;
  max-width: 100%;
}

li + li {
  border-top: 1px dashed var(--colorText);
}

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
  overflow: hidden;
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

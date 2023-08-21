<template>
  <li>
    <header>
      <div>
        <User :user="post.users" /> <time :datetime="date">{{ date }}</time>
      </div>
      <div class="actions">
        <Button variant="ghost" size="small" @click="togglePopover(post.id)">
          <Icon name="carbon:overflow-menu-horizontal" size="1.5rem" />
        </Button>
      </div>
    </header>
    <PostContent :content="post.content" />
    <small v-if="post.edited">Editado</small>
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
const emit = defineEmits(['delete', 'edit'])

const { showPopover } = storeToRefs(store)

const { startPostEdition, togglePopover, deletePost } = store

const isOwner = computed(() => {
  return props.post.author_id === user.value.id
})

const date = computed(() => formatDate(props.post.created_at))

const handleEdit = () => {
  startPostEdition(props.post.id, props.post.content)
  showPopover.value = false
}

const handleDelete = async () => {
  await deletePost(props.post.id)
  emit('delete')
}
</script>

<style scoped>
li {
  padding: var(--spaceM) 0;
  position: relative;
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
<template>
  <li>
    <header>
      <div>
        <User :user="post.users" /> <time :datetime="date">{{ date }}</time>
      </div>
      <div class="actions">
        <small v-if="post.edited">Editado</small>
        <Button v-if="isOwner" variant="ghost" size="small" @click="toggleMenu">⋯</Button>
      </div>
    </header>
    <Content :content="post.content" />
    <Dropdown class="menu" v-if="showPopover === post.id">
      <Button variant="ghost" @click="handleEdit">Editar</Button>
      <Button variant="ghost" @click="emit('delete', post.id)">Eliminar</Button>
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

const isOwner = computed(() => {
  return props.post.author_id === user.value.id
})

const date = computed(() => formatDate(props.post.created_at))

const toggleMenu = () => {
  if (showPopover.value !== props.post.id) {
    showPopover.value = props.post.id
  } else {
    showPopover.value = null
  }
}

const handleEdit = () => {
  emit('edit', props.post.id, props.post.content)
  showPopover.value = false
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

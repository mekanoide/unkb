<template>
  <form @submit.prevent="handlePost()">
    <textarea
      v-model="content"
      rows="5"
      cols="50"
      maxlength="1024"
      placeholder="Escribe tu movida (puedes usar Markdown!!!)"
    ></textarea>
    <footer>
      <div class="actions">
        <Button type="submit" variant="primary">Enviar</Button>
        <Button v-if="edit" @click="cancelEdition">Cancelar</Button>
      </div>
      <span>{{ wordCount }}</span>
    </footer>
  </form>
</template>

<script setup>
const props = defineProps({
  edit: {
    type: [String , null]
  }
})

const {edit} = toRefs(props)

const user = useSupabaseUser()
const client = useSupabaseClient()

const emit = defineEmits(['post', 'edit', 'cancel'])

const content = ref('')

const wordCount = computed(() => {
  return `${content.value.length} / 1024`
})

const handlePost = () => {
  if (edit.value !== null) {
    console.log('emitiendo edit')
    emit('edit', content.value)
  } else {
    console.log('emitiendo post')
    emit('post', content.value)
  }
  content.value = ''
}

const cancelEdition = () => {
  content.value = ''
  emit('cancel')
}

watch(edit, (newEdit, oldEdit) => {
  if (newEdit !== null) {
    content.value = newEdit
  }
})

</script>

<style scoped>
form {
  display: grid;
  grid-auto-flow: row;
  gap: var(--spaceS);
}

textarea {
  font-size: var(--fontL);
}

footer {
  display: grid;
  grid-auto-flow: column;
  align-content: start;
  justify-content: space-between;
}

.actions {
  display: grid;
  grid-auto-flow: column;
  gap: var(--spaceS);
  align-items: center;
  justify-content: start;
}
</style>

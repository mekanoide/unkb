<script setup>
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/post'
const store = usePostStore()

const { postContent } = storeToRefs(store)
const { cancelPostEdition } = store

const props = defineProps({
  edition: {
    type: Boolean
  },
  rows: {
    type: Number
  }
})

const emit = defineEmits(['post', 'cancel'])

const wordCount = computed(() => {
  return `${postContent.value.length}/1024`
})
</script>

<template>
  <form @submit.prevent="emit('post')">
    <textarea
      v-model="postContent"
      columns="50"
      :rows="rows || 4"
      maxlength="1024"
      :placeholder="
        $attrs.placeholder || 'Escribe tu movida (puedes usar Markdown!!!)'
      "></textarea>
    <footer>
      <div class="actions">
        <Button
          type="submit"
          variant="primary"
          :disabled="postContent.length === 0"
          >Enviar</Button
        >
        <Button
          v-if="edition"
          @click="cancelPostEdition"
          >Cancelar</Button
        >
      </div>
      <span>{{ wordCount }}</span>
    </footer>
  </form>
</template>

<style scoped>
form {
  display: grid;
  grid-auto-flow: row;
  gap: var(--spaceS);
}

textarea {
  width: 100%;
  font-size: var(--fontL);
  transition: var(--transition);
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

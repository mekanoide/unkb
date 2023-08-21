<template>
  <form @submit.prevent="emit('post')">
    <textarea
      v-model="postContent"
      rows="5"
      cols="50"
      maxlength="1024"
      placeholder="Escribe tu movida (puedes usar Markdown!!!)"
    ></textarea>
    <footer>
      <div class="actions">
        <Button type="submit" variant="primary" :disabled="postContent.length === 0">Enviar</Button>
        <Button v-if="edition" @click="store.cancelPostEdition">Cancelar</Button>
      </div>
      <span>{{ wordCount }}</span>
    </footer>
  </form>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
const store = useMainStore()

const { postContent } = storeToRefs(store)

const props = defineProps({
  edition: {
    type: Boolean
  }
})

const emit = defineEmits(['post', 'cancel'])

const wordCount = computed(() => {
  return `${postContent.value.length} / 1024`
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
<script setup>
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/post'
import { onClickOutside } from '@vueuse/core'
const store = usePostStore()

const { postContent } = storeToRefs(store)
const focused = ref(false)

const props = defineProps({
  cancellable: {
    type: Boolean
  },
  minRows: {
    type: Number
  },
  maxRows: {
    type: Number
  },
  size: {
    type: String
  },
  pending: {
    type: Boolean
  }
})

const post = ref(null)

const emit = defineEmits(['post', 'cancel'])

const handleSubmit = () => {
  emit('post')
  focused.value = false
}

const wordCount = computed(() => {
  return `${postContent.value.length}/1024`
})

onClickOutside(post, (e) => {
  focused.value = false
})

const computedRows = computed(() => {
  if (focused.value) {
    return props.maxRows || 8
  } else {
    return props.minRows || 2
  }
})
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    ref="post">
    <textarea
      v-model="postContent"
      columns="50"
      :rows="computedRows"
      maxlength="1024"
      :placeholder="
        $attrs.placeholder || 'Escribe tu movida (puedes usar Markdown!!!)'
      "
      :class="{ focus: focused }"
      @click="focused = true">
    </textarea>
    <footer>
      <div class="actions">
        <Button
          type="submit"
          :disabled="postContent.length === 0 || pending">
          <Spinner v-if="pending" />
          <span v-else>Enviar</span>
        </Button>
        <Button
          v-if="cancellable"
          :disabled="pending"
          @click="emit('cancel')"
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

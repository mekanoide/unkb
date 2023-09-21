<script setup>
import { storeToRefs } from 'pinia'
import { useEditionStore } from '@/stores/edition'
import { onClickOutside } from '@vueuse/core'
const editionStore = useEditionStore()

const focused = ref(false)

const { edit } = storeToRefs(editionStore)

const props = defineProps({
  cancellable: {
    type: Boolean
  },
  notes: {
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

const content = ref(edit.value?.content ?? null)
const post = ref(null)
const scope = ref('connections')

const emit = defineEmits(['submit', 'cancel'])

const handleSubmit = () => {
  emit('submit', content.value, scope.value)
  focused.value = false
  content.value = null
}

const wordCount = computed(() => {
  if (content.value) {
    return `${content.value.length}/1024`
  }
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
      v-model="content"
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
        <Button v-if="notes" type="submit">Terminar</Button>
        <ButtonPublish v-else :disabled="!content || pending" v-model="scope" />
        <Button
          v-if="cancellable"
          variant="secondary"
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

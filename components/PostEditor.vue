<script setup>
import { usePostStore } from '@/stores/post'
import { onClickOutside } from '@vueuse/core'
const postStore = usePostStore()

const props = defineProps({
  postType: {
    type: String,
    required: false,
    default: 'post'
  },
  cancel: {
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

const focused = ref(false)
const content = ref(null)
const post = ref(null)

const defaultScope = computed(() => {
  if (props.postType === 'reply') {
    return null
  }
  if (props.postType === 'note') {
    return 'private'
  }
  return 'connections'
})

const scope = ref(defaultScope)

const emit = defineEmits(['post', 'cancel'])

const handleSubmit = async () => {
  emit('post', content.value, scope.value)
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

const insertSpaces = (e) => {
  const { selectionStart, selectionEnd } = e.target
  const spaces = '  '
  const spacesLength = spaces.length
  const spacesStart = selectionStart + spacesLength
  const spacesEnd = selectionEnd + spacesLength
  content.value =
    content.value.substring(0, selectionStart) +
    spaces +
    content.value.substring(selectionEnd)
  e.target.setSelectionRange(spacesStart, spacesEnd)
}
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
      @keydown.tab.prevent="insertSpaces"
      @click="focused = true">
    </textarea>
    <Footer>
      <Actions>
        <ButtonPublish
          v-if="postType === 'post'"
          :disabled="!content || pending"
          v-model="scope" />
        <Button
          v-else
          type="submit">
          Publicar
        </Button>
        <Button
          v-if="cancel"
          variant="secondary"
          :disabled="pending"
          @click="emit('cancel')"
          >Cancelar</Button
        >
      </Actions>
      <span>{{ wordCount }}</span>
    </Footer>
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
</style>

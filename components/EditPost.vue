<script setup>
import { storeToRefs} from 'pinia'
import { useEditionStore } from '@/stores/edition'
const editionStore = useEditionStore()

const { submitEdition, cancelEdition } = editionStore
const { edit } = storeToRefs(editionStore)

const emit = defineEmits(['edited'])

const handlePost = async (content, scope) => {
  await submitEdition(content, scope)
  emit('edited')
}
</script>

<template>
  <div class="EditPost">
    <div class="wrapper">
      <PostEditor
        cancellable
        :minRows="16"
        :maxRows="16"
        :note="edit.type === 'note'"
        @submit="handlePost"
        @cancel="cancelEdition" />
    </div>
  </div>
</template>

<style scoped>
.EditPost {
  position: fixed;
  background-color: var(--colorBackground);
  inset: 0;
  z-index: 100;
  display: grid;
  align-items: center;
  padding: var(--spaceM);
}

.wrapper {
  width: 100%;
  max-width: 800px;
  margin: auto;
}
</style>

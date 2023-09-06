<script setup>
const props = defineProps({
  reply: {
    type: Boolean
  }
})

import { usePostStore } from '@/stores/post'
const store = usePostStore()

const { finishPostEdition, cancelPostEdition } = store

const emit = defineEmits(['edited'])

const handlePost = async () => {
  const type = props.reply ? 'reply' : ''
  await finishPostEdition(type)
  emit('edited')
}
</script>

<template>
  <div class="EditPost">
    <div class="wrapper">
      <PostEditor cancellable :rows="16" @post="handlePost" @cancel="cancelPostEdition" />
    </div>
  </div>
</template>

<style scoped>
.EditPost {
  position: fixed;
  inset: 0;
  background-color: var(--colorBackground);
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

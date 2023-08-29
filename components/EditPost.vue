<template>
  <div class="EditPost">
    <div class="wrapper">
      <PostEditor edition @post="handlePost" />
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from '@/stores/post'
const store = usePostStore()

const { finishPostEdition } = store

const emit = defineEmits(['edited'])

const handlePost = async () => {
  await finishPostEdition()
  console.log('Edición terminada!!!')
  emit('edited')
}
</script>

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

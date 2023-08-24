<template>
  <div class="EditPost">
    <PostEditor edition @post="handlePost" />
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/main'
const store = useMainStore()

const { finishPostEdition } = store

const emit = defineEmits(['edited'])

const handlePost = async () => {
  await finishPostEdition()
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
  place-content: center;
  padding: var(--spaceM);
}
</style>

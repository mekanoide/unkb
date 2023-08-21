<template>
  <div class="ReplyPost">
    <Post :post="post" />
    <PostEditor edition @post="handlePost" />
  </div>
</template>

<script setup>
const props = defineProps({
  
})


import { useMainStore } from '@/stores/main'
const store = useMainStore()

const emit = defineEmits(['refresh'])

const handlePost = async () => {
  await store.finishPostEdition()
  emit('refresh')
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

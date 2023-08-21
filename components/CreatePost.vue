<template>
  <PostEditor @post="handlePost" />
</template>

<script setup>
import { useMainStore } from '@/stores/main'
const store = useMainStore()

const emit = defineEmits(['refresh'])

const handlePost = async () => {
  await store.createPost()
  emit('refresh')
}
</script>

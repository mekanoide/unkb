<template>
  <PostEditor @post="handlePost" />
</template>

<script setup>
import { usePostStore } from '@/stores/post'
const store = usePostStore()

const { createPost } = store

const emit = defineEmits(['posted'])

const handlePost = async () => {
  await createPost()
  emit('posted')
}
</script>

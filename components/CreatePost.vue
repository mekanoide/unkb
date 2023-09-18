<script setup>
import { usePostStore } from '@/stores/post'
const store = usePostStore()

const { createPost } = store
const pending = ref(false)

const emit = defineEmits(['posted'])

const handlePost = async (content) => {
  pending.value = true
  await createPost(content)
  emit('posted')
  pending.value = false
}
</script>

<template>
  <PostEditor
    :pending="pending"
    @submit="handlePost"
    :minRows="2" />
</template>

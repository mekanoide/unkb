<template>
  <PostEditor
    :pending="pending"
    @post="handlePost"
    :minRows="2" />
</template>

<script setup>
import { usePostStore } from '@/stores/post'
const store = usePostStore()

const { createPost } = store
const pending = ref(false)

const emit = defineEmits(['posted'])

const handlePost = async () => {
  pending.value = true
  await createPost()
  emit('posted')
  pending.value = false
}
</script>

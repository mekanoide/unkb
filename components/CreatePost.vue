<script setup>
import { usePostStore } from '@/stores/post'
const store = usePostStore()

const { createPost } = store
const pending = ref(false)

const emit = defineEmits(['posted'])

const handlePost = async (content, scope) => {
  pending.value = true
  await createPost(content, scope)
  emit('posted')
  pending.value = false
}
</script>

<template>
  <PostEditor
    :pending="pending"
    postType="post"
    @post="handlePost"
    :minRows="2" />
</template>

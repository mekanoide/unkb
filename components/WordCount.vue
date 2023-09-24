<script setup>
const props = defineProps({
  count: {
    type: Number,
    required: true
  }
})

const wordCount = computed(() => {
  return `${props.count}/1024`
})
</script>

<template>
  <div class="WordCount">
    <span class="word-count">{{ wordCount }}</span>
  </div>
</template>
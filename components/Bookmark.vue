<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="Bookmark">
    <div>{{ data.author.users.handle }}</div>
    <PostContent :content="data.content.content" />
  </div>
</template>

<style scoped>
.Bookmark {
  padding: var(--spaceM);
  border-radius: var(--corner);
  border: 2px solid currentColor;
}
</style>

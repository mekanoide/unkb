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
    <User :data="data.author.users" />
    <PostContent :content="data.content.content" />
  </div>
</template>

<style scoped>
.Bookmark {
}
</style>

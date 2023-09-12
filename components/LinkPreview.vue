<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <a :href="data.url" target="_blank" class="LinkPreview">
    <p>{{ data.site_name }}</p>
    <h2>{{ data.title }}</h2>
    <p>{{ data.description }}</p>
  </a>
</template>

<style scoped>
.LinkPreview {
  display: block;
  padding: var(--spaceM);
  background-color: var(--colorText);
  color: var(--colorBackground);
  border-radius: var(--corner);
}
</style>

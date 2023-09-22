<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <img :src="data.image_url" alt="image" />
  <a
    :href="data.url"
    target="_blank"
    class="LinkPreview">
    <div class="metadata">
      <p v-if="data.site_name">{{ data.site_name }}</p>
      <h2>{{ data.title }}</h2>
      <p v-html="data.description"></p>
    </div>
    <Icon
      name="ph:arrow-circle-right"
      size="2.5rem" />
  </a>
</template>

<style scoped>
.LinkPreview {
  padding: var(--spaceM);
  background-color: var(--colorText);
  color: var(--colorBackground);
  border-radius: var(--corner);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: var(--spaceM);
}

.metadata {
  display: grid;
  gap: var(--spaceS);
}

.LinkPreview:hover {
  color: var(--colorAccent);
}

.dark-mode .LinkPreview:hover {
  background-color: var(--colorAccent);
  color: var(--colorDark);
}
</style>

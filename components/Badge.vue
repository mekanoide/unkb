<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <span
    v-if="data.id !== 4"
    class="Badge">
    <Icon
      name="ph:pentagram-bold"
      size="0.75rem" />
  </span>
</template>

<style scoped>
.Badge {
  font-size: var(--fontS);
  border-radius: var(--corner);
  text-transform: uppercase;
  position: relative;
}
</style>

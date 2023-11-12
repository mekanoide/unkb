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
    𖤐
  </span>
</template>

<style scoped>
.Badge {
  font-weight: bold;
  border-radius: var(--corner);
  text-transform: uppercase;
  position: relative;
}
</style>

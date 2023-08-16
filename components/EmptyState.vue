<template>
  <h2>{{ message }}</h2>
</template>

<script setup>
const props = defineProps(['message'])
</script>

<style scoped>
h2 {
  padding: var(--spaceXL) 0;
  font-size: var(--fontXL);
  font-weight: 700;
  background: var(--gradientFaded);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

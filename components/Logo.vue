<template>
  <div>{{ config.public.appName }}</div>
</template>

<script setup>
const config = useRuntimeConfig()
</script>

<style scoped>
div {
  text-transform: uppercase;
  font-weight: bold;
  font-size: var(--fontL);
}
</style>
<template>
  <NuxtLink to="/">{{ config.public.appName }}</NuxtLink>
</template>

<script setup>
const config = useRuntimeConfig()
</script>

<style scoped>
a {
  font-family: var(--fontHeadline);
  text-transform: uppercase;
  font-weight: bold;
  font-size: 3rem;
}
</style>
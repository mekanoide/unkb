<template>
  <NuxtLink to="/" aria-label="Inicio">
    {{ config.public.appName }}
  </NuxtLink>
</template>

<script setup>
const config = useRuntimeConfig()
</script>

<style scoped>
a {
  font-family: var(--fontHeadline);
  text-transform: uppercase;
  font-weight: bold;
  font-size: 4rem;
  line-height: 1;
  rotate: -6deg;
}
</style>

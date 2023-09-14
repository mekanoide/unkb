<template>
  <NuxtLink to="/" aria-label="Inicio">
    <span>{{ config.public.appName }}</span>
    <span>{{ config.public.appName }}</span>
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
  font-size: 2.5rem;
  line-height: 1;
  display: grid;
}

span {
  grid-column: 1;
  grid-row: 1;
}

span:nth-child(1) {
  background: var(--gradientFaded);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  rotate: -6deg;
  z-index: -1;
}
</style>

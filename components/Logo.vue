<template>
  <NuxtLink to="/">
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
  font-size: 3rem;
  display: grid;
}

span {
  grid-column: 1;
  grid-row: 1;
}

span:nth-child(2) {
  background: var(--gradientFaded);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  rotate: -6deg;
  translate: 0.5rem 0.125rem;
}
</style>

<template>
  <NuxtLink :to="to"><Icon :name="icon" size="1.5rem" />{{ label }}</NuxtLink>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
  }
})
</script>

<style scoped>
a {
  display: grid;
  grid-auto-flow: column;
  gap: var(--spaceS);
  align-items: center;
  justify-content: start;
  font-size: var(--fontL);
}

a.router-link-active {
  font-weight: bold;
}
</style>
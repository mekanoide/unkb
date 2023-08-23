<template>
  <NuxtLink :to="to"><Icon :name="icon" size="1.5rem" /><span>{{ label }}</span></NuxtLink>
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
  transition: var(--transition);
  padding: var(--spaceS);
  border-radius: var(--corner);
}

a:hover {
  background-color: var(--colorText);
  color: var(--colorBackground);
}

a.router-link-active {
  font-weight: bold;
  background-color: var(--colorText);
  color: var(--colorBackground);
}

@media screen and (max-width: 1024px) {
  span {
    display: none;
  }
}
</style>
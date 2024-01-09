<template>
  <NuxtLink
    :to="to"
    :aria-label="label">
    <Icon
      :name="icon"
      size="1.5rem" />
  </NuxtLink>
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
    type: String
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
  transition: var(--transition);
  padding: var(--spaceM);
  border-radius: var(--cornerButton);
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
}

a:active {
  color: var(--colorDark);
  background-color: var(--colorAccent);
}

a.router-link-active {
  background-color: var(--colorAccent);
  color: var(--colorDark);
}
</style>

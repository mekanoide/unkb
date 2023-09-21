<script setup>
const props = defineProps({
  variant: {
    type: String
  }
})
</script>

<template>
  <button
    type="button"
    :class="[variant]">
    <slot><!-- optional fallback --></slot>
  </button>
</template>

<style scoped>
button {
  display: grid;
  grid-auto-flow: column;
  gap: var(--spaceS);
  align-items: center;
  justify-content: start;
  font-size: var(--fontL);
  transition: var(--transition);
  padding: var(--spaceS);
  border-radius: var(--corner);
  text-transform: uppercase;
  font-weight: bold;
}

button.primary {
  background-color: var(--colorText);
  color: var(--colorBackground);
}

button:hover {
  background-color: var(--colorAccent);
  color: var(--colorDark);
}
</style>
